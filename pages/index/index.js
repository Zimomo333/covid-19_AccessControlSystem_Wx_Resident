//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    openid: null,
    registerSign: false
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    // 由于 getOpenid 是网络请求，可能会在 Page.onLoad 之后才返回
    // 所以此处加入 callback 以防止这种情况
    app.openidReadyCallback = res => {
      this.setData({
        openid: app.globalData.openid,
        registerSign: app.globalData.registerSign
      })
    }
  },
  goToLogin: function(e) {
    wx.navigateTo({
      url: '/pages/login/login',
    })
  },
  goToWxLogin: function(e) {
    wx.request({
      url: 'http://localhost:8080/wx/resident/wx-login',
      data: {
        openid: this.openid
      },
      success: res => {
        app.globalData.id = res.data.id
        if(res.data.result==0){
          wx.navigateTo({
            url: '/pages/home/home'
          })
        } else {
          wx.showModal({
            content: "读写错误",
            showCancel: false,
          })
          return false
        }
      }
    })
  },
  goToRegister: function(e) {
    wx.navigateTo({
      url: '/pages/register/register'
    })
  }
})
