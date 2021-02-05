// app.js
App({
  // 生命周期函数
  onLaunch() {},

  // 修改导航方法
  navChange(index) {
    this.globalData.navIndex = index
  },

  // 全局默认参数
  globalData: {
    // 底部导航选中
    navIndex: 0,
    // 底部导航
    navList: [{
        url: '',
        name: '战绩查询',
        icon: '/images/tabbar/basics.png',
        actIcon: '/images/tabbar/basics_cur.png'
      },
      {
        url: '',
        name: '排行榜',
        icon: '/images/tabbar/basics.png',
        actIcon: '/images/tabbar/basics_cur.png'
      }
    ]
  }
})