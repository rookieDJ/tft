const {
  getSearch
} = require('../../service/index.js')
// pages/searchName/searchName.js
Component({

  // 生命周期函数
  attached() {
    this.init();
  },
  /**
   * 组件的属性列表
   */

  options: {
    addGlobalClass: true
  },
  properties: {
    serveList: {
      type: Array,
      value: []
    }
  },
  // 获取异步方法值
  observers: {
    serveList(data) {
      console.log(data) // 这边才能娶到异步的值
      this.setData({
        pageList: data
      })
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    // 区服
    pageList: [],
    // 下标
    searchIndex: 0,
    // 名字
    gamer: '',
    // 玩家信息
    gamerInfo: {}
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 初始化
    init() {},
    // 修改区服
    updateServeList(e) {
      this.setData({
        searchIndex: e.detail.value
      })
    },
    // 查询详情
    async searchInfo() {
      try {
        let subData = {
          name: this.data.gamer,
          server: this.data.pageList[this.data.searchIndex].val
        }
        let {
          data
        } = await getSearch(subData)
        console.log(res);
        this.setData({
          gamerInfo: data
        })
      } catch (error) {
        console.error(error);
      }
    },
    // 修改名字
    updateGamer(e) {
      this.data.gamer = e.detail.value;
    }
  },

})