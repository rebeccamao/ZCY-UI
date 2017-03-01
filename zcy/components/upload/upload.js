
import plupload from 'plupload'

// import uploadModern from './upload-modern'
// import uploadOld from './upload-old'
import uploadHbs from '../../handlebars/partials/upload.hbs'

/**
 * @param accept: ''          接受上传的类型
 * @param name: 'zossfile'    上传的属性值
 * @param multiple: false     是否上传多个文件
 * @param disabled: false     是否禁用
 * @param onChange: function     文件改变时的回调
 * @param onPreview: function    预览文件时的回调
 * @param onRemove: function     移除文件时的回调
 */
const DEFAULTS = {
  name: 'zossfile',
  multiple: false,    //
  text: '上传',
  accept: '',
  onChange: null,
  onPreview: null,
  onRemove: null,
  disabled: false
}

// const files = []

// function isModernBrowser() {
//   return !!window.FileReader
// }

function getOptions() {
  return DEFAULTS
}

function getUploader(button, container) {
  const uploader = new plupload.Uploader({
    runtimes : 'html5,flash,silverlight,html4',
    browse_button : button,
    container: container,
    url : '/api/test/upload',
    filters : {
      max_file_size: '10mb',
      mime_types: [
        { title: 'Image files', extensions: 'jpg,gif,png' },
        { title: 'Zip files', extensions: 'zip' }
      ]
    },
    // Flash settings
    flash_swf_url : '/plupload/js/Moxie.swf',
    // Silverlight settings
    silverlight_xap_url : '/plupload/js/Moxie.xap',
    init: {
      PostInit: function () {
        document.getElementById('filelist').innerHTML = '';
        document.getElementById('uploadfiles').onclick = function () {
          uploader.start();
          return false;
        };
      },
      FilesAdded: function (up, files) {
        plupload.each(files, (file) => {
          document.getElementById('filelist').innerHTML += `<div id="${file.id}">${file.name}(${plupload.formatSize(file.size)})<b></b></div>`
        });
      },
      UploadProgress: function (up, file) {
        document.getElementById(file.id).getElementsByTagName('b')[0].innerHTML = `<span>${file.percent}%</span>`
      },
      Error: function (up, err) {
        document.getElementById('console').innerHTML += `\nError #${err.code}:${err.message}`
      }
    }
  })

  uploader.init()
  return uploader
}


export default {
  boot(prefix = '.zcy-upload') {
    const uploader = getUploader('pickfiles', $('#container')[0])
    console.info(uploader)
    const $content = uploadHbs(getOptions())
    // if (isModernBrowser) {
    //   uploadModern.list()
    // } else {
    //   // uploadOld()
    // }
    $(prefix).replaceWith($content)
  },

  getFiles() {
    return files
  },

  start() {

  }
}

