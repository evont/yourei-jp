export default class Api {
  static request(options) {
    const { action, data = {}, cb } = options;
    const queryData = Object.assign({ $url: action }, data)
    wx.cloud.callFunction({
      name: 'route',
      data: queryData,
      success: res => {
        cb && cb(res.result)
      },
      fail: err => {
        console.error(`[云函数] [${action}] 调用失败`, err)
      }
    })
  }
}