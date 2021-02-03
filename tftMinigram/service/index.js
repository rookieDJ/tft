export const getSearch = data => {
  return new Promise((resolve, reject) => {
    wx.request({
      url: 'https://wxapp.madao.live/search', //仅为示例，并非真实的接口地址
      data,
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        resolve(res.data)
      },
      fail(err) {
        reject(err)
      }
    })

  })
}
export const getBasic = () => {
  return new Promise((resolve, reject) => {
    wx.request({
      url: 'https://wxapp.madao.live/basic/serve', //仅为示例，并非真实的接口地址
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        console.log(res.data)
        resolve(res.data)
      },
      fail(err) {
        reject(err)
      }
    })
  })

}