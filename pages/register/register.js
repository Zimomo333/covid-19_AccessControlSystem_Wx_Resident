// pages/register/register.js
import WxValidate from '../../utils/WxValidate.js'
const app = getApp()

Page({
  data: {
    form: {   //注意必须在form包裹下，否则equalTo无效
      username: '',
      password: '',
      confirm_password: '',
      sex: '',
      identity_card: '',
      house_no: '',
      avatarUrl: '',
    },
    openid: '',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },

  onLoad: function() {
    this.initValidate();
    this.setData({  //比app.js加载慢得多，无需异步callback
      openid: app.globalData.openid
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
      avatarUrl: {
        required: true
      },
      username: {
        required: true,
        maxlength: 20
      },
      password: {
        required: true,
        maxlength: 20
      },
      confirm_password: {
        required: true,
        equalTo: 'password'
      },
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
      avatarUrl: {
        required: '请获取微信头像'
      },
      username: {
        required: '请填写用户名',
        maxlength: '用户名最多为 20 位'
      },
      password: {
        required: '请填写密码',
        maxlength: '密码最多为 20 位'
      },
      confirm_password: {
        required: '请确认密码',
        equalTo: '输入的两次密码不一致'
      },
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
    this.showModal({
      msg: '提交成功'
    })
    wx.navigateTo({
      url: '/pages/home/home'
    })
  },

  formReset(e) {
    console.log('form发生了reset事件，携带数据为：', e.detail.value)
  },

  getUserInfo: function(e) {
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})