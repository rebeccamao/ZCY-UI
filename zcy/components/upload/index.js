import 'plupload'

import './style/index.less'

// style dependencies
import '../progress/style/index.less'
import '../tooltip/style/index.less'

import Upload from './upload'


export default {

  /**
   * 启动
   * 注册文件上传
   */
  boot(prefix) {
    return Upload.boot(prefix)
  },
  /**
   * 列出bucket的文件列表
   */
  list() {
    return Upload.list()
  },

  /**
   * 文件上传
   *
   */
  getFiles() {
    return Upload.getFiles()
  },

  /**
   * 文件下载
   *
   */
  download() {

  }

}
