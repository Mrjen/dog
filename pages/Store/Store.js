// pages/Store/Store.js
Page({
  data: {

  },

  onLoad: function (options) {
    var that = this;
    var sign = wx.getStorageSync("sign");
    wx.request({
      url:'https://single-dog.playonwechat.com/api/dog-food-list?sign='+sign,
      success(res){
        console.log(res);
        var dogFood = res.data.data;
        that.setData({
          dogFood:dogFood
        })
      }
    })
  },

  // 购买狗粮
  buyStoreDogFood:function(ev){
     console.log(ev);
     var that = this;
     var price = ev.currentTarget.dataset.price;
     var gid = ev.currentTarget.dataset.gid;
     var item_num = ev.currentTarget.dataset.gidnum;
     var sign = wx.getStorageSync("sign");
     var account = that.data.account;
     var nav_food_num = that.data.nav_food_num;
       wx.request({
         url: 'https://single-dog.playonwechat.com/api/buy-dog-food?sign=' + sign,
         data:{
           gid:gid
         },
         success(res){
           console.log(res);
            if (res.data.data) {
              wx.requestPayment({
                'timeStamp': res.data.data.timeStamp,
                'nonceStr':res.data.data.nonceStr,
                'package':res.data.data.package,
                'signType': 'MD5',
                'paySign': res.data.data.paySign,
                'success':function(res){
                  console.log(res);
                  that.setData({
                    nav_food_num:nav_food_num+item_num
                  })
                },
                'fail':function(res){
                  console.log(res);
                }
             })
           }else {
             wx.showToast({
                title: '狗粮购买成功',
                icon: 'success',
                duration: 2000
              })
           }
         }
       })
  },

  onReady: function () {

  },

  onShow: function () {

  },

  onHide: function () {

  },

  onUnload: function () {

  },

  onPullDownRefresh: function () {

  },

  onReachBottom: function () {

  },

  onShareAppMessage: function () {

  }
})
