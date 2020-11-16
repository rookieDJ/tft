const router = require('koa-router')()
const spa = require('../lib/spa')
const {getIp} = require('../lib/utils')
let logger = require('../lib/log');
router.get('/', async (ctx, next) => {
  let request =ctx.request;
  logger.info(`当前访问ip地址为${await getIp(request)}`);
  
  let data =await spa()
  ctx.body =data
  // await ctx.render('index',data )
})


module.exports = router
