const http = require('http');
const request = require('request');
const $ = require('cheerio');
const axios = require('axios');
module.exports = (url, data) => {
  console.log('cheerio', url);
  return new Promise((resolve, reject) => {
    axios.get(url, data).then(res => {
      resolve(res.data)
    }).catch((error) => {
      reject(error)
    });
  })


}