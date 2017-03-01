// import OSS from 'ali-oss'

const FILEKEY = 'zossfile'

function getOssClient(url = '/api/zoss/getSTSToken', fileNum = 1, bizCode = '1099') {
  return $.get(url, { fileNum, bizCode })
  .then((data) => {
    if (!data || !data.success) {
      throw new Error('获取文件上传ossAccess异常')
    }

    const creds = data.result
    console.info('creds', creds)
    return new OSS.Wrapper({
      region: creds.endPoint,
      accessKeyId: creds.accessKeyId,
      accessKeySecret: creds.accessKeySecret,
      stsToken: creds.securityToken,
      bucket: creds.bucket
    })
  })
}

export default {
  /**
   * 列出bucket的文件列表
   *
   * @param {any} options
   * {
   *   max-keys: '10'
   * }
   * @returns {
   *   objects: []
   * }
   */
  list(options = {}) {
    return getOssClient(options.url, 1, options.bizCode)
    .then((client) => { client.list(options) })
  },

  /**
   * 文件上传
   *
   * @param {any} files         要上传的文件
   * @param {any} options
   * {
   *    progress: 上传进程回调
   * }
   * @returns
   */
  upload(files, options = {}) {
    return getOssClient(options.url, files.length, options.bizCode)
    .then((client) => {
      client.multipartUpload(FILEKEY, files, {
        progress: options.progress
      })
    })
  },

  /**
   * 文件下载
   *
   * @param {any} fileId        文件id
   * @param {any} [options={}]
   * @returns
   */
  download(fileId, options = {}) {
    return getOssClient(options.url, 1, options.bizCode)
    .then((client) => {
      client.signatureUrl(fileId, {
        expires: 3600,
        response: {
          'content-disposition': `attachment filename="${options.fileName}"`
        }
      })
    })
  }
}
