//app.js
App({
  onLaunch: function () {

    const statusBarHeight = wx.getSystemInfoSync().statusBarHeight
    const custom = wx.getMenuButtonBoundingClientRect()
    const titleBarHeight = Math.floor(custom.bottom + custom.top - (statusBarHeight * 2));

    const menuButton = wx.getMenuButtonBoundingClientRect()
    //px转换rpx的比例
    const pxToRpxScale = 750 / wx.getSystemInfoSync().windowWidth;
    //标题栏高度
    this.globalData.titleBarHeight = titleBarHeight
    //状态栏高度
    this.globalData.statusBarHeight = statusBarHeight

    //右上角胶囊按钮的布局信息
    this.globalData.menuButton = menuButton

    
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  globalData: {
    userInfo: null,
    titleBarHeight: 0,
    statusBarHeight: 0,
    menuButton:null
  }
})