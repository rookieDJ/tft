// 获取应用实例
const app = getApp()
const {
  getSearch
} = require('../../service/index.js')
// pages/searchName/searchName.js
Component({

  // 生命周期函数
  attached() {
    this.loadModal()
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
      if (data.length > 0) {
        this.setData({
          loadModal: false
        })
        this.searchInfo()
      }

    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    loadModal: false,
    // 区服
    pageList: [],
    // 下标
    searchIndex: 3,
    // 名字
    gamer: '灼眼的夏侯惇',
    // 玩家信息
    gamerInfo: {}
  },

  /**
   * 组件的方法列表
   */
  methods: {

    // 初始化
    init() {

    },
    // 修改区服
    updateServeList(e) {
      this.setData({
        searchIndex: e.detail.value
      })
    },
    // 查询详情
    async searchInfo() {
      this.setData({
        loadModal: true
      })
      try {
        let subData = {
          name: this.data.gamer,
          server: this.data.pageList[this.data.searchIndex].val
        }
        let {
          data
        } = await getSearch(subData)
        this.setData({
          gamerInfo: data,
          loadModal: false
        })
      } catch (error) {
        console.error(error);
      }
    },
    // 修改名字
    updateGamer(e) {
      this.data.gamer = e.detail.value;
    },
    // 全局加载方法
    loadModal() {
      this.setData({
        loadModal: true
      })
    },
    // 跳转到详情
    jumptoDetail() {
      wx.navigateTo({
        url: '../detail/detail'
      })
    }
  },

})