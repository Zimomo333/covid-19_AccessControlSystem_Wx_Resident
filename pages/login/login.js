// pages/login.js
import WxValidate from '../../utils/WxValidate.js'

Page({
  data: {
    form: {   //注意必须在form包裹下，否则equalTo无效
      username: '',
      password: ''
    }
  },

  onLoad:function(){
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
      username: {
        required: true,
        maxlength: 20
      },
      password: {
        required: true,
        maxlength: 20
      }
    }
    const messages = {
      username: {
        required: '请填写用户名'
      },
      password: {
        required: '请填写密码'
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
    wx.navigateTo({
      url: '/pages/home/home'
    })
    wx.request({
      url: 'http://localhost:8080/wx/resident/login',
      data: {
        username: this.username,
        password: this.password
      },
      success: res => {
        var result = res.data.result
        if(result == 0){
          app.globalData.id = res.data.id
          wx.navigateTo({
            url: '/pages/home/home'
          })
        } else if (result == 1) {
          this.showModal({
            msg: '密码错误'
          })
          return false
        } else if (result == 2) {
          this.showModal({
            msg: '用户名不存在'
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