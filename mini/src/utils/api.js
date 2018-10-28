export default class Api {
  static request(options) {
    const { action, data = {}, cb } = options;
    wx.cloud.callFunction({
      name: action,
      data,
      success: res => {
        cb && cb(res.result)
      },
      fail: err => {
        console.error(`[云函数] [${action}] 调用失败`, err)
      }
    })
  }
}