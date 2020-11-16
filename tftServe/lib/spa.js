const puppeteer = require('puppeteer');
const chalk = require('chalk');
const log = console.log
let spa = ( () => {
    return new Promise(async reslove =>{
        const opt ={
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
        const url = 'https://lolchess.gg/profile/jp/%E5%88%B6%E6%9D%96%E6%B5%A9%E7%80%9A'
        log(chalk.green(`------开始启动无头浏览器-----`))
        log(chalk.blue(`正在前往${url}中`))
        let goto =await page.goto(url, {timeout: 0});
        log(chalk.blue(`已经到达${url}，开始分割数据`))
        let container = '.container'
        let content = await page.$('html')
        log(chalk.green(`------结束，关闭无头浏览器-----`))
        await browser.close()
        reslove(container)
    })
});


module.exports = spa