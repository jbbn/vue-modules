const fs = require('fs')
const pkg = './package.json'
let file = require(pkg)
let view = require('./view.js')

file.version = view.version

fs.writeFile(pkg, JSON.stringify(file), function (err) {
  if (err) return console.log(err)
})
