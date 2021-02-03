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
router.prefix('/search')
router.get('/', async (ctx, next) => {
  try {
    // let {
    //   name,
    //   server
    // } = ctx.params
    let {
      name,
      server
    } = ctx.query;
    // let urlParams = encodeURIComponent('非物質えぐって')
    const body = await get(`https://lolchess.gg/profile/jp/${encodeURIComponent(name)}`)
    // const body = await get(`https://lolchess.gg/profile/jp/%E7%81%BC%E7%9C%BC%E7%9A%84%E5%A4%8F%E4%BE%AF%E6%83%87`)
    if (body) {
      let request = ctx.request;
      logger.info(`当前访问ip地址为${await getIp(request)}`);
      ctx.set("Content-Type", "application/json")
      ctx.body = success(pleyerInfo(body))
    } else {
      ctx.body = error(500, 'res为空')
    }
  } catch (e) {
    logger.info(`接口报错${e}`);
    ctx.body = error(999, e)
  }
})
module.exports = router