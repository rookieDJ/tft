const cheerio = require('cheerio')
module.exports = {
  // 详情默认返回模板
  pleyerInfo: (html) => {
    $ = cheerio.load(html)
    // 头像地址
    let headerUrl = $('.profile__icon>img').attr('src')
    let headerTest = headerUrl.replace(/^[^a-zA-Z]+/, '')
    // 名字
    let name = $(".profile__summoner__name").clone() //复制元素
      .children() //获取所有子元素
      .remove() //删除所有子元素
      .end() //回到选择的元素
      .text().trim() //删除前后空格
    // 服务器
    let server = $(".profile__summoner__region").text().trim()
    // 等级
    let level = $(".summoner-level").text().trim()
    // 段位信息
    let rank = {}
    // 段位图标
    let rankIconUrl = $('.profile__tier__icon>img').attr('src')
    // let rankIconUrlTest = rankIconUrl.replace(/^[^a-zA-Z]+/, '')
    rank.icon = rankIconUrl.replace(/^[^a-zA-Z]+/, '')
    // 段位级别
    rank.level = $(".profile__tier__summary__tier").text().trim()
    // 胜点
    rank.point = $(".profile__tier__summary__lp").text().replace(/[^\d]+/, '')
    // 名次
    rank.rankNum = $(".rank-region").text().replace(/[^\d]+/, '').trim()
    return {
      headerUrl: headerTest,
      name,
      server,
      level,
      rank
    }

  }
}