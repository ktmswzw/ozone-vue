'use strict'

const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  SERVER_API: '"https://imanon.net/wx"'
  // SERVER_API: '"http://localhost:7007/wx"'
})
