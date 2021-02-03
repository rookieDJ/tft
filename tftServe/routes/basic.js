const router = require('koa-router')()
router.prefix('/basic')
const {
  success
} = require('@lib/res')
const url = require('@cont/basic')
router.get('/serve', (ctx, next) => {
  ctx.set("Content-Type", "application/json")
  ctx.body = success(url)
})
module.exports = router