const cheerio = require('cheerio')
const get = require('@lib/cheerio')
module.exports = {
  // 详情默认返回模板
  pleyerInfo: async (html, params) => {

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
    // 赛季
    let seasonList = $('.profile__seasons .expanded')
    let seasonNow = ''
    let seasonListArr = []
    // 使用jq拼装赛季信息
    seasonList.each(function (index) {
      let seaso = $(this).text().replace(/\s+/g, "")
      seaso = seaso.split('-')[0].replace(/[^\d]+/, '')
      seasonListArr.push(seaso)
      if (index == seasonList.length - 1) seasonNow = seaso
    })
    // 胜场
    let wins = $(".profile__tier__wins .profile__tier__stat__value").text().replace(/[^\d]+/, '').trim()
    //获取准确信息
    const topsInfo = await get(`https://lolchess.gg/profile/${params.server}/${encodeURIComponent(params.name)}/s${seasonNow}/tops`)
    // 前四
    let tops = topsInfo.tops || $(".profile__tier__tops .profile__tier__stat__value").text().replace(/[^\d]+/, '').trim()
    // 场数
    let played = $(".profile__tier__plays .profile__tier__stat__value").text().replace(/[^\d]+/, '').trim()
    // 平均名次
    let avgRank = '#' + topsInfo.avg_rank || $('.profile__tier__avg_rank .profile__tier__stat__value').html().trim()
    // $(".profile__tier__stat__value").each(function () {
    //   if ($(this).parents('.col-6').hasClass('profile__tier__avg_rank')) {
    //     avgRank = $(this).text().trim()
    //   }
    // })
    // 拼装战绩信息
    const matchesHtml = await get(`https://lolchess.gg/profile/${params.server}/${encodeURIComponent(params.name)}/s${seasonNow}/matches`)
    $$ = cheerio.load(matchesHtml)
    let matches = {}
    // 场数
    matches.num = $$('.profile__match-history-v2>h4').text().replace(/[^\d]+/g, '').trim()
    // 计算有多少页
    matches.page = Math.ceil(matches.num / 10)
    // 列表数据收集
    matches.list = []
    $$('.profile__match-history-v2__item').each(function (index) {
      // 羁绊
      let traits = $(this).find('.traits')
      // 比赛基础信息
      let summary = $(this).find('.summary')
      // 排位名次
      let placement = summary.find('.placement').text().trim().replace(/[^\d]+/g, '')
      // 模式（排位，匹配）
      let gameMode = summary.find('.game-mode').text().trim()
      // 时长
      let length = summary.find('.length').text().trim()
      // 时间
      let age = summary.find('.age').text().trim()
      // 阵容信息
      let units = $(this).find('.units')
      let data = {
        placement,
        gameMode,
        length,
        age,
        traits: [],
        units: []
      }
      // 羁绊拼装
      traits.find('div').each(function () {
        let className = $(this).attr("class")
        let imgUrl = $(this).find('img').attr('src')
        data.traits.push({
          className,
          imgUrl
        })
      })
      // 英雄拼装
      units.find('.unit').each(function () {
        let imgUrl = $(this).find('.tft-champion>img').attr('src')
        data.units.push({
          imgUrl
        })
      })

      matches.list.push(data)
    })
    return {
      headerUrl: headerTest,
      name,
      server,
      level,
      rank,
      wins,
      tops,
      played,
      avgRank,
      seasonNow,
      seasonListArr,
      matches
    }

  }
}