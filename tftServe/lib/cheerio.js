const http = require('http');
const request = require('request');
const $ = require('cheerio');
module.exports = url => {
  console.log('cheerio', url);
  return new Promise((resolve, reject) => {
    request(url, (error, response, body) => {
      console.log(error);
      resolve(body)
    })
  })
}