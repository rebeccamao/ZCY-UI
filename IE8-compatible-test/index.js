var express = require('express')
var path = require('path')
var app = express()

app.use(express.static(__dirname))
app.use(express.static(path.resolve(__dirname, '..', 'dist/static')))

app.all('/*', function(req, res) {
  res.sendFile(path.join(__dirname, 'index.html'));
})

app.listen(8000, function(err) {
  if (err) {
    console.info(err)
  }
})
console.info('listen: 8000')