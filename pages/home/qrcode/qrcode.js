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
    wx.request({
      url: 'http://localhost:8080/wx/resident/qrcode', //获取图片的URL
      method:"get",
      data: {
        id: app.globalData.id
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