require('babel-register')({
  presets: ['env'],
  plugins: ['transform-object-rest-spread']
})
module.exports = require('../src/app')
