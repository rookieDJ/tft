const router = require('koa-router')()
const get = require('@lib/cheerio')
const {
  pleyerInfo
} = require('@cont/search')
const {
  getIp
} = require('@utils')
const {
  success,
  error
} = require('@lib/res')
let logger = require('@lib/log');
// router.get('/', async (ctx, next) => {
//   let request =ctx.request;
//   logger.info(`当前访问ip地址为${await getIp(request)}`);

//   let data =await spa()
//   ctx.body =data
//   // await ctx.render('index',data )
// })
router.get('/search/:name', async (ctx, next) => {
  try {
    let {
      name
    } = ctx.params
    // let urlParams = encodeURIComponent('非物質えぐって')
    const res = await get(`https://lolchess.gg/profile/jp/${encodeURIComponent(name)}`)
    let body = JSON.parse(res).body
    ctx.set("Content-Type", "application/json")
    ctx.body = success(
      pleyerInfo(body))
  } catch (e) {
    ctx.body = error(999, e)
  }
})
module.exports = router