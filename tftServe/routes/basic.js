const router = require('koa-router')()
router.prefix('/basic')

const get = require('@lib/cheerio')
const {
  success
} = require('@lib/res')
const url = require('@cont/basic')
router.get('/serve', async (ctx, next) => {
  let res = await get('https://int-et.xiamenair.com/flights/results?check=1')
  ctx.body = success(res)
})
module.exports = router