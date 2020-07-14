// pages/home/bind/bind.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    is_bind: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    wx.request({
      url: app.globalData.ip+'/wx/resident/if-bind',
      data: {
        id: app.globalData.id
      },
      success: res => {
        this.setData({
          is_bind: res.data.is_bind
        })
      }
    })
  },
  bind(){
    wx.request({
      url: app.globalData.ip+'/wx/resident/bind',
      data: {
        id: app.globalData.id,
        openid: app.globalData.openid
      },
      success: res => {
        if(res.data.result==0){
          wx.showModal({
            content: "绑定成功",
            showCancel: false,
          })
          this.setData({
            is_bind: true
          })
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
      url: app.globalData.ip+'/wx/resident/cancel-bind',
      data: {
        id: app.globalData.id
      },
      success: res => {
        if(res.data.result==0){
          wx.showModal({
            content: "解绑成功",
            showCancel: false,
          })
          this.setData({
            is_bind: false
          })
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