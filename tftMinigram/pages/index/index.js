// index.js
// 获取应用实例
const app = getApp()
// 获取全局函数
const {
  navChange
} = app
const {
  getBasic,
  getSearch
} = require('../../service/index.js')

Page({
  data: {
    // 底部导航
    navList: app.globalData.navList,
    navIndex: app.globalData.navIndex,
    // 区服信息
    serveList: [],

  },
  // 事件处理函数
  bindViewTap() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  init() {
    this.getBasic()
  },
  // tab修改方法
  navChange(e) {
    let index = e.currentTarget.dataset.cur
    navChange(index)
    this.setData({
      navIndex: index
    })
  },
  onLoad() {
    console.log('app', app);
    this.init();
    // if (app.globalData.userInfo) {
    //   this.setData({
    //     userInfo: app.globalData.userInfo,
    //     hasUserInfo: true
    //   })
    // } else if (this.data.canIUse) {
    //   // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
    //   // 所以此处加入 callback 以防止这种情况
    //   app.userInfoReadyCallback = res => {
    //     this.setData({
    //       userInfo: res.userInfo,
    //       hasUserInfo: true
    //     })
    //   }
    // } else {
    //   // 在没有 open-type=getUserInfo 版本的兼容处理
    //   wx.getUserInfo({
    //     success: res => {
    //       app.globalData.userInfo = res.userInfo
    //       this.setData({
    //         userInfo: res.userInfo,
    //         hasUserInfo: true
    //       })
    //     }
    //   })
    // }
  },
  // 
  getUserInfo(e) {
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  // 区服列表修改
  bindPickerChange(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      serveIndex: e.detail.value
    })
  },
  // 查询战绩
  async serachInfo() {
    try {
      let res = await getSearch({
        name: '灼眼的夏侯惇',
        server: 'jp'
      })
      this.setData({
        serveIndex: e.detail.value
      })
    } catch (error) {
      console.log(error);
    }
  },
  // 获取区服列表
  async getBasic() {
    try {
      let {
        data
      } = await getBasic()
      this.setData({
        serveList: data
      })
      console.log(this.data);

    } catch (error) {
      console.log(error);
    }

  }
})