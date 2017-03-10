const Promise = require('bluebird')
const request = require('request')
Promise.promisifyAll(request)

const fs = require('fs')
Promise.promisifyAll(fs)
const path = require('path')

const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })

const httpProxy = require('http-proxy')
const proxy = httpProxy.createProxyServer()

const authStr = new Buffer('zcyadmin:vK6olR5IzoceCP8u').toString('base64')
const baseAuthStr = 'Basic ' + authStr // 基础接口对接的校验参数
let authorizationValue = ''  // 调用接口时的校验参数

const name = '339900864'
const password = '123456'

function jsonParse(data) {
  try {
    return JSON.parse(data)
  } catch (e) {
    return {}
  }
}

function getUaaHostpath() {
  return 'http://login.dev.cai-inc.com'
}

function getMiddlePath() {
  return 'http://middle.dev.cai-inc.com'
}

function getOauthUri () {
  return getUaaHostpath() + '/oauth/token?grant_type=password&username=' + name + '&password=' + password
}


function getAuthorization () {
  // 已经存在，直接返回
  if (authorizationValue) {
    return Promise.resolve(authorizationValue)
  }

  const oauthUri = getOauthUri()
  return request.postAsync({
    uri: oauthUri,
    headers: {
      Authorization: baseAuthStr
    }
  })
  .then(function (res) {
    const data = jsonParse(res.body)
    const tokenType = data.token_type
    const accessToken = data.access_token
    authorizationValue = tokenType + ' ' + accessToken
  })
  .then(function () {
    // 一小时执行
    return authorizationValue
  })
}
getAuthorization()

module.exports = function(router) {
  router.all('/*', (req, res, next) => {
    console.info('请求', req.path)
    next()
  })

  // 文件上传测试
  router.post('/api/test/upload', upload.array('file'), (req, res) => {
    console.info('files', req.files)
    if (!req.files || !req.files.length) {
      res.status(200).send({success: true})
      return
    }
    res.status(200).send({success: true})
  })

  // 转发zoss的请求
  router.all('/api/zoss/*', (req, res) => {
    console.info('转发请求', req.path)
    proxy.web(req, res, {target: getMiddlePath(), changeOrigin: true})

    proxy.on('proxyReq', function (proxyReq, req, res, options) {
      proxyReq.setHeader('Authorization', authorizationValue)
    })
  })
}
