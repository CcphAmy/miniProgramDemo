//index.js
//获取应用实例
var imageUtil = require('../../utils/util.js');  
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    schoolName:'广州番禺职业技术学院\n',
    schoolLab: 'Guangzhou Panyu Polytechnic',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    imagefirstsrc: '/images/len.jpg',//图片链接  
    imagewidth: 0,//缩放后的宽  
    imageheight: 0,//缩放后的高  
    pictures: [
      'http://121.33.253.219/zs/images/pypphoto1.jpg',
      'http://121.33.253.219/zs/images/pypphoto2.jpg',
      'http://121.33.253.219/zs/images/pypphoto3.jpg',
      'http://121.33.253.219/zs/images/pypphoto4.jpg',
      'http://121.33.253.219/zs/images/pypphoto5.jpg',
      'http://121.33.253.219/zs/images/pypphoto6.jpg'
    ]
  },
  //事件处理函数
  previewImage: function (e) {
    
    var that = this,
      index = e.currentTarget.dataset.index,
      pictures = this.data.pictures;
    wx.previewImage({
      current: pictures[index],
      urls: pictures
    })
  },
  imageLoad: function (e) {
    var imageSize = imageUtil.imageUtil(e)
    this.setData({
      imagewidth: imageSize.imageWidth/3-10,
      imageheight: imageSize.imageWidth / 3 - 10
    })
  },
  onShareAppMessage: function (res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: '广州番禺职业技术学院',
      path: '/pages/index/index?id=123',
      imageUrl: 'http://121.33.253.219/zs/images/mingping.jpg',
      success: function (res) {
        // 转发成功
      },
      fail: function (res) {
        // 转发失败
      }
    }
  },
  makePhoneCall: function () {

    wx.showModal({
      title: '提示',
      content: '拨打1:020-34874086\r\n拨打2:020-84731206',
      cancelText: '拨打1',
      confirmText: '拨打2',
      success: function (res) {
        if (res.confirm) {
          wx.makePhoneCall({
            phoneNumber: '02084731206',
            success: function () {
              console.log("成功拨打电话")
            }
          })
        }else{
          wx.makePhoneCall({
            phoneNumber: '02034874086',
            success: function () {
              console.log("成功拨打电话")
            }
          })
        }

      }
    })
  },
  openLocation: function () {
    wx.getLocation({
      type: 'gcj02', //返回可以用于wx.openLocation的经纬度
      
      success: function (res) {
        console.log(res)
        var latitude = 22.9018
        var longitude = 113.3081
        wx.openLocation({
          latitude: latitude,
          longitude: longitude,
          scale: 28,
          name:'广州番禺职业技术学院',
          address:'广东省广州市番禺区市良路1342号'
        })
      }
    })
  },
  bindViewTap: function() {
    wx.navigateTo({
      //url: '../logs/logs'
    })
  },
  onLoad: function () {
    wx.setNavigationBarTitle({
      title: '番职招生'
    })
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },//模板消息推送
})
