const router = require('koa-router')()
router.prefix('/basic')

// const get = require('@lib/cheerio')
const {
  success
} = require('@lib/res')
const url = require('@cont/basic')
router.get('/serve', async (ctx, next) => {
  ctx.body = success(url)
})
module.exports = router