// pages/home/record/record.js
const app = getApp()
let time = require('../../../utils/util');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.request({
      url: app.globalData.ip+'/wx/resident/record',
      data: {
        id: app.globalData.id
      },
      success: res => {
        res.data.list.forEach(element => {
          element.time = time.formatTimeTwo(element.time,'Y-M-D h:m:s')
        });
        this.setData({
          list: res.data.list
        })
      }
    })
  }

})