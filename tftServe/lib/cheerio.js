const http = require('http');
const request = require('request');
const $ = require('cheerio');
module.exports = url => {
  return new Promise((resolve, reject) => {
    request(url, (error, response, body) => {
      resolve(JSON.stringify(response))
    })
  })
}