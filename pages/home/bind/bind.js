// pages/home/bind/bind.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    is_bind: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.request({
      url: 'http://localhost:8080wx/resident/if-bind',
      data: {
        id: app.globalData.id
      },
      success: res => {
        this.is_bind = res.data.is_bind
      }
    })
  },
  bind(){
    wx.request({
      url: 'http://localhost:8080/wx/resident/bind',
      data: {
        id: app.globalData.id,
        openid: app.globalData.openid
      },
      success: res => {
        if(res.result==1){
          wx.showModal({
            content: "绑定成功",
            showCancel: false,
          })
          this.is_bind=true
        } else {
          wx.showModal({
            content: "绑定失败",
            showCancel: false,
          })
        }
      }
    })
  },
  cancelBind(){
    wx.request({
      url: 'http://localhost:8080/wx/resident/cancel-bind',
      data: {
        id: app.globalData.id
      },
      success: res => {
        if(res.result==1){
          wx.showModal({
            content: "解绑成功",
            showCancel: false,
          })
          this.is_bind=false
        } else {
          wx.showModal({
            content: "解绑失败",
            showCancel: false,
          })
        }
      }
    })
  }
})