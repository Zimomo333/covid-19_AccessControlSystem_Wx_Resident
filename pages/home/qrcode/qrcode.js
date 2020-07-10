// pages/home/qrcode/qrcode.js
const app = getApp()

Page({
  /**
   * 页面的初始数据
   */
  data: {
    QRcodeUrl: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    this.setData({
      openid: app.globalData.openid
    })
    wx.request({
      url: 'http://localhost:8080/wx/qrcode', //获取图片的URL
      method:"get",
      data: {
        openid: this.data.openid
      },
      success: res => {
        let url ='data:image/png;base64,'+res.data
        this.setData({
          QRcodeUrl: url,     //设置data里面的图片url
        })
      }
    })
  }
})