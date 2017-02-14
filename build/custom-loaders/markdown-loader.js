var cheerio = require('cheerio')
var hljs = require('highlight.js')
var loaderUtils = require('loader-utils')
var markdown = require('markdown-it')
var markdownAnchor = require('markdown-it-anchor')
var markdownContainer = require('markdown-it-container')

var cache = require('./cache')
var striptags = require('./strip-tags')
var slugify = require('transliteration').slugify

/**
 * `{{ }}` => `<span>{{</span> <span>}}</span>`
 * @param  {string} str
 * @return {string}
 */
var replaceDelimiters = function (str) {
  return str.replace(/({{|}})/g, '<span>$1</span>')
}

/**
 * renderHighlight
 * @param  {string} str
 * @param  {string} lang
 */
var renderHighlight = function (str, lang) {
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
var renderVueTemplate = function (html) {
  var $ = cheerio.load(html, {
    decodeEntities: false,
    lowerCaseAttributeNames: false,
    lowerCaseTags: false
  })

  var output = {
    style: $.html('style'),
    script: $.html('script')
  }
  var result

  $('style').remove()
  $('script').remove()

  result = '<template><section>' + $.html() + '</section></template>\n' +
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

  var parser
  var params = loaderUtils.parseQuery(this.query)
  var opts = Object.assign(params, this.vueMarkdown, this.options.vueMarkdown)

  if ({}.toString.call(opts.render) === '[object Function]') {
    parser = opts
  } else {
    opts = Object.assign({
      preset: 'default',
      html: true,
      breaks: true,
      highlight: renderHighlight
    }, opts)

    var plugins = opts.use
    var preprocess = opts.preprocess

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
        // var m = tokens[idx].info.trim().match(/^demo\s*(.*)$/);
        if (tokens[idx].nesting === 1) {
          // var description = (m && m.length > 1) ? m[1] : '';
          var summaryContent = tokens[idx + 1].content
          var summary = striptags.fetch(summaryContent, 'summary')
          var summaryHTML = summary ? parser.render(summary) : ''

          var content = tokens[idx + 2].content
          var html = convert(striptags.strip(content, ['script', 'style'])).replace(/(<[^>]*)=""(?=.*>)/g, '$1')
          var script = striptags.fetch(content, 'script')
          var style = striptags.fetch(content, 'style')
          var code = tokens[idx + 2].markup + tokens[idx + 2].info + '\n' + content + tokens[idx + 2].markup
          var codeHtml = code ? parser.render(code) : ''

          var jsfiddle = { html: html, script: script, style: style }
          jsfiddle = parser.utils.escapeHtml(JSON.stringify(jsfiddle))

          // opening tag
          return `<demo-box :jsfiddle="${jsfiddle}">
                      <div class="box-demo-show" slot="component">${html}</div>
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

  var codeInlineRender = parser.renderer.rules.code_inline
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

  var filePath = this.resourcePath
  var content = parser.render(source).replace(/__at__/g, '@')
  var result = renderVueTemplate(content)

  filePath = cache.save(filePath, result)

  return 'module.exports = require(' +
    loaderUtils.stringifyRequest(this, '!!vue-loader!' + filePath) +
    ');'
}
