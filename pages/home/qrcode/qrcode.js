// pages/home/qrcode/qrcode.js
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
      url: 'http://localhost:8080/getQRcode', //获取图片的URL
      method:"get",
      success: res => {
        let url ='data:image/png;base64,'+res.data
        this.setData({
          QRcodeUrl: url,     //设置data里面的图片url
        })
      }
    })
  }
})