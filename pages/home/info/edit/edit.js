import WxValidate from '../../../../utils/WxValidate.js'
const app = getApp()

Page({
  data: {
    form: {   //注意必须在form包裹下，否则equalTo无效
      sex: '',
      identity_card: '',
      house_no: ''
    },
    photo: '',
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },

  onLoad: function() {
    this.initValidate();
    //获取上一页变量
    var pages = getCurrentPages();
    var prevPage = pages[pages.length - 2];  //上一个页面
    this.setData({
      form: {
        sex: prevPage.data.sex,
        identity_card: prevPage.data.identity_card,
        house_no: prevPage.data.house_no
      },
      photo: prevPage.data.photo
    })
  },

  //报错 
  showModal(error) {
    wx.showModal({
      content: error.msg,
      showCancel: false,
    })
  },
  //验证函数
  initValidate() {
    const rules = {
      sex: {
        required: true
      },
      identity_card: {
        required: true,
        idcard: true
      },
      house_no: {
        required: true,
        maxlength: 15
      }
    }
    const messages = {
      sex: {
        required: '请填写性别'
      },
      identity_card: {
        required: '请填写身份证',
        idcard: '请输入18位的有效身份证'
      },
      house_no: {
        required: '请填写住址号',
        maxlength: '住址号最多为 15 位'
      }
    }
    this.WxValidate = new WxValidate(rules, messages)
  },

  formSubmit(e) {
    console.log('form发生了submit事件，携带数据为：', e.detail.value)
    const params = e.detail.value
    //校验表单
    if (!this.WxValidate.checkForm(params)) {
      const error = this.WxValidate.errorList[0]
      this.showModal(error)
      return false
    }
    wx.request({
      url: app.globalData.ip+'/wx/resident/edit',
      data: {
        id: app.globalData.id,
        sex: params.sex,
        identity_card: params.identity_card,
        house_no: params.house_no,
        photo: params.photo
      },
      success: res => {
        var result = res.data.result
        if(result == 0){
          this.showModal({
            msg: '修改成功'
          })
          wx.navigateTo({
            url: '/pages/home/info/info'
          })
        } else if (result == 1) {
          this.showModal({
            msg: '读写错误'
          })
          return false
        }
      }
    })
  },

  formReset(e) {
    console.log('form发生了reset事件，携带数据为：', e.detail.value)
  },

  getUserInfo: function(e) {
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      photo: e.detail.userInfo.avatarUrl
    })
  }
})