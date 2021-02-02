const cheerio = require('cheerio');
// 成功默认
exports.success = (data = {}) => {
  const info = {
    code: 200,
    data
  }
  return info
}

// 失败默认
exports.error = (code = 500, msg = '错误') => {
  const info = {
    code,
    data: null,
    msg
  }
  console.error(msg);
  return info
}