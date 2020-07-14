import WxValidate from '../../../utils/WxValidate.js'
const app = getApp()

Page({
  data: {
    form: {   //注意必须在form包裹下，否则equalTo无效
      old_password: '',
      password: '',
      confirm_password: ''
    },
  },

  onLoad: function() {
    this.initValidate();
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
      old_password: {
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
      }
    }
    const messages = {
      old_password: {
        required: '请填写旧密码',
        maxlength: '密码最多为 20 位'
      },
      password: {
        required: '请填写新密码',
        maxlength: '密码最多为 20 位'
      },
      confirm_password: {
        required: '请确认密码',
        equalTo: '输入的两次密码不一致'
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
      url: app.globalData.ip+'/wx/resident/change-pwd',
      data: {
        id: app.globalData.id,
        old_password: params.old_password,
        password: params.password,
        confirm_password: params.confirm_password
      },
      success: res => {
        var result = res.data.result
        if(result == 0){
          app.globalData.id = res.data.id
          this.showModal({
            msg: '修改成功'
          })
        } else if (result == 1) {
          this.showModal({
            msg: '两次密码不一致'
          })
          return false
        } else if (result == 2) {
          this.showModal({
            msg: '旧密码不正确'
          })
          return false
        } else if (result == 3) {
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
  }
})