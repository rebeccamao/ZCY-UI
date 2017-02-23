const cheerio = require('cheerio')
const path = require('path')
const hljs = require('highlight.js')
const loaderUtils = require('loader-utils')
const markdown = require('markdown-it')
const markdownAnchor = require('markdown-it-anchor')
const markdownContainer = require('markdown-it-container')

const cache = require('./cache')
const striptags = require('./strip-tags')
const slugify = require('transliteration').slugify

/**
 * `{{ }}` => `<span>{{</span> <span>}}</span>`
 * @param  {string} str
 * @return {string}
 */
const replaceDelimiters = function (str) {
  return str.replace(/({{|}})/g, '<span>$1</span>')
}

/**
 * renderHighlight
 * @param  {string} str
 * @param  {string} lang
 */
const renderHighlight = function (str, lang) {
  if (!(lang && hljs.getLanguage(lang))) {
    return ''
  }

  try {
    return replaceDelimiters(hljs.highlight(lang, str, true).value)
  } catch (err) {}
}

/**
 * html => vue file template
 * @param  {[type]} html [description]
 * @return {[type]}      [description]
 */
const renderVueTemplate = function (html) {
  const $ = cheerio.load(html, {
    decodeEntities: false,
    lowerCaseAttributeNames: false,
    lowerCaseTags: false
  })

  const output = {
    style: $.html('style'),
    script: $.html('script')
  }

  $('style').remove()
  $('script').remove()

  let result = '<template><section>' + $.html() + '</section></template>\n' +
    output.style + '\n' +
    output.script

  return result
}

function convert (str) {
  str = str.replace(/(&#x)(\w{4});/gi, function ($0) {
    return String.fromCharCode(parseInt(encodeURIComponent($0).replace(/(%26%23x)(\w{4})(%3B)/g, '$2'), 16))
  })
  return str
}

function wrap (render) {
  return function () {
    return render.apply(this, arguments)
      .replace('<code class="', '<code class="hljs ')
      .replace('<code>', '<code class="hljs">')
  }
};

module.exports = function (source) {
  this.cacheable()

  let filePath = this.resourcePath
  const componentName = path.basename(filePath, '.md')

  let parser
  let params = loaderUtils.parseQuery(this.query)
  let opts = Object.assign(params, this.vueMarkdown, this.options.vueMarkdown)

  let preprocess
  if ({}.toString.call(opts.render) === '[object Function]') {
    parser = opts
  } else {
    opts = Object.assign({
      preset: 'default',
      html: true,
      breaks: true,
      highlight: renderHighlight
    }, opts)

    let plugins = opts.use
    preprocess = opts.preprocess

    delete opts.use
    delete opts.preprocess

    parser = markdown(opts.preset, opts)

    parser.use(markdownAnchor, {
      level: 2,
      slugify: slugify,
      permalink: true,
      permalinkBefore: true
    })
    parser.use(markdownContainer, 'demo', {
      validate: function (params) {
        return params.trim().match(/^demo\s*(.*)$/)
      },

      render: function (tokens, idx) {
        if (tokens[idx].nesting === 1) {
          let summaryContent = tokens[idx + 1].content
          let summary = striptags.fetch(summaryContent, 'summary')
          let summaryHTML = summary ? parser.render(summary) : ''

          let content = tokens[idx + 2].content
          let html = convert(striptags.strip(content, ['script', 'style'])).replace(/(<[^>]*)=""(?=.*>)/g, '$1')
          let script = striptags.fetch(content, 'script')
          let style = striptags.fetch(content, 'style')
          let code = tokens[idx + 2].markup + tokens[idx + 2].info + '\n' + content + tokens[idx + 2].markup
          let codeHtml = code ? parser.render(code) : ''

          let jsfiddle = { html: html, script: script, style: style }
          jsfiddle = parser.utils.escapeHtml(JSON.stringify(jsfiddle))

          // opening tag
          return `<demo-box :jsfiddle="${jsfiddle}">
                      <div class="box-demo-show zcy-${componentName}-demo" slot="component">${html}</div>
                      <div slot="description">${summaryHTML}</div>
                      <div class="highlight" slot="code">${codeHtml}</div>
                    `
        } else {
          // closing tag
          return '</demo-box>\n'
        }
      }
    })

    if (plugins) {
      plugins.forEach(function (plugin) {
        if (Array.isArray(plugin)) {
          parser.use.apply(parser, plugin)
        } else {
          parser.use(plugin)
        }
      })
    }
  }

  let codeInlineRender = parser.renderer.rules.code_inline
  parser.renderer.rules.code_inline = function () {
    return replaceDelimiters(codeInlineRender.apply(this, arguments))
  }
  parser.renderer.rules.table_open = function () {
    return '<table class="table">'
  }
  parser.renderer.rules.fence = wrap(parser.renderer.rules.fence)

  if (preprocess) {
    source = preprocess.call(this, parser, source)
  }
  source = source.replace(/@/g, '__at__')


  let content = parser.render(source).replace(/__at__/g, '@')
  let result = renderVueTemplate(content)

  filePath = cache.save(componentName, result)

  return 'module.exports = require(' +
    loaderUtils.stringifyRequest(this, '!!vue-loader!' + filePath) +
    ');'
}
