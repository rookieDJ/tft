const puppeteer = require('puppeteer');
const chalk = require('chalk');
const {
  config
} = require('./config');
const log = console.log
module.exports = ((serverName = '/jp', gameId = '/制杖浩瀚') => {
  return new Promise(async reslove => {
    const url = config.url + serverName + gameId
    const opt = {
      //设置超时时间
      timeout: 50000,
      //如果是访问https页面 此属性会忽略https错误
      ignoreHTTPSErrors: true,
      // 关闭headless模式, 不会打开浏览器
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    }
    const browser = await puppeteer.launch(opt);
    const page = await browser.newPage();
    log(chalk.green(`------开始启动无头浏览器-----`))
    log(chalk.blue(`正在前往${url}中`))
    try {
      let goto = await page.goto(url, {
        timeout: 0
      });
    } catch (error) {
      log(chalk.red(error))
    }
    log(chalk.blue(`已经到达${url}，开始分割数据`))
    let container = await page.$$eval('.gnb>.container>ul>li a', el => {
      let arr = []
      el.forEach(e => {
        let res = {
          enName: e.innerHTML
        }
        arr.push(res)
      })
      return arr
    })
    log(chalk.red('----------------'))
    // 数据分割
    let exp = /<.*>/;
    // container.forEach(el=>{
    //   el =exp.exec(el)[0]
    //   console.log(exp.exec(el)[0]);
    // })

    log(chalk.red('----------------'))
    log(chalk.green(`------结束，关闭无头浏览器-----`))
    await browser.close()
    reslove(container)
  })
});