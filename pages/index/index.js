//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    openid: null,
    registerSign: false,
    cardCur: 0,
    swiperList: [{
      id: 0,
      type: 'image',
      url: 'http://wx3.sinaimg.cn/large/007dHF5Jgy1gboys8n78cj30hs0a0k1y.jpg'
    }, {
      id: 1,
        type: 'image',
        url: 'http://img3.imgtn.bdimg.com/it/u=912344757,1797410610&fm=15&gp=0.jpg',
    }, {
      id: 2,
      type: 'image',
      url: 'http://img2.imgtn.bdimg.com/it/u=3548009499,3472389903&fm=15&gp=0.jpg'
    }, {
      id: 3,
      type: 'image',
      url: 'http://img5.imgtn.bdimg.com/it/u=1057924158,700135667&fm=15&gp=0.jpg'
    }, {
      id: 4,
      type: 'image',
      url: 'http://img.zcool.cn/community/01b8355e2f90c5a801216518f56466.jpg@3000w_1l_0o_100sh.jpg'
    }, {
      id: 5,
      type: 'image',
      url: 'http://img2.imgtn.bdimg.com/it/u=1946654567,3359226007&fm=26&gp=0.jpg'
    }]
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    this.towerSwiper('swiperList');
    // 初始化towerSwiper 传已有的数组名即可

    // 由于 getOpenid 是网络请求，可能会在 Page.onLoad 之后才返回
    // 所以此处加入 callback 以防止这种情况
    app.openidReadyCallback = res => {
      this.setData({
        openid: app.globalData.openid,
        registerSign: app.globalData.registerSign
      })
    }
  },
  goToLogin: function(e) {
    wx.navigateTo({
      url: '/pages/login/login',
    })
  },
  goToWxLogin: function(e) {
    wx.request({
      url: 'http://localhost:8080/wx/resident/wx-login',
      data: {
        openid: this.openid
      },
      success: res => {
        app.globalData.id = res.data.id
        if(res.data.result==0){
          wx.navigateTo({
            url: '/pages/home/home'
          })
        } else {
          wx.showModal({
            content: "读写错误",
            showCancel: false,
          })
          return false
        }
      }
    })
  },
  goToRegister: function(e) {
    wx.navigateTo({
      url: '/pages/register/register'
    })
  },
  // cardSwiper
  cardSwiper(e) {
    this.setData({
      cardCur: e.detail.current
    })
  },
  // towerSwiper
  // 初始化towerSwiper
  towerSwiper(name) {
    let list = this.data[name];
    for (let i = 0; i < list.length; i++) {
      list[i].zIndex = parseInt(list.length / 2) + 1 - Math.abs(i - parseInt(list.length / 2))
      list[i].mLeft = i - parseInt(list.length / 2)
    }
    this.setData({
      swiperList: list
    })
  },
  // towerSwiper触摸开始
  towerStart(e) {
    this.setData({
      towerStart: e.touches[0].pageX
    })
  },
  // towerSwiper计算方向
  towerMove(e) {
    this.setData({
      direction: e.touches[0].pageX - this.data.towerStart > 0 ? 'right' : 'left'
    })
  },
  // towerSwiper计算滚动
  towerEnd(e) {
    let direction = this.data.direction;
    let list = this.data.swiperList;
    if (direction == 'right') {
      let mLeft = list[0].mLeft;
      let zIndex = list[0].zIndex;
      for (let i = 1; i < list.length; i++) {
        list[i - 1].mLeft = list[i].mLeft
        list[i - 1].zIndex = list[i].zIndex
      }
      list[list.length - 1].mLeft = mLeft;
      list[list.length - 1].zIndex = zIndex;
      this.setData({
        swiperList: list
      })
    } else {
      let mLeft = list[list.length - 1].mLeft;
      let zIndex = list[list.length - 1].zIndex;
      for (let i = list.length - 1; i > 0; i--) {
        list[i].mLeft = list[i - 1].mLeft
        list[i].zIndex = list[i - 1].zIndex
      }
      list[0].mLeft = mLeft;
      list[0].zIndex = zIndex;
      this.setData({
        swiperList: list
      })
    }
  }
})
