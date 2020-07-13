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
    sex_option: ['未知','男','女']
  },

  onLoad: function() {
    wx.request({
      url: app.globalData.ip+'/wx/resident/info',
      data: {
        id: app.globalData.id
      },
      success: res => {
        this.setData({
          id: res.data.info.id,
          username: res.data.info.username,
          name: res.data.info.name,
          sex: res.data.info.sex,
          identity_card: res.data.info.identity_card,
          photo: res.data.info.photo,
          house_no:  res.data.info.house_no,
          health_status: res.data.info.health_status,
          access_times: res.data.info.access_times,
          is_locked: res.data.info.is_locked
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