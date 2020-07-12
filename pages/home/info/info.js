const app = getApp()

Page({
  data: {
    id: '',
    username: '',
    name: '',
    sex: '',
    identity_card: '',
    photo: '',
    house_no: '',
    health_status: '',
    access_times: '',
    is_locked: '',
  },

  onLoad: function() {
    wx.request({
      url: 'http://localhost:8080/wx/info',
      data: {
        id: app.globalData.id
      },
      success: res => {
        this.setData({
          id: res.data.id,
          username: res.data.username,
          name: res.data.name,
          sex: res.data.sex,
          identity_card: res.data.identity_card,
          photo: res.data.photo,
          house_no:  res.data.house_no,
          health_status: res.data.health_status,
          access_times: res.data.access_times,
          is_locked: res.data.is_locked
        })
      }
    })
  },

  formSubmit(e) {
    wx.navigateTo({
      url: '/pages/home/info/edit/edit'
    })
  },

})