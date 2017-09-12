// pages/Load/Load.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  nextStep:function(){
     this.setData({
       emailLevel:"none"
     })
  },

  toIndex:function(){
    wx.redirectTo({
     url: '../index/index'
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
     var that = this;
     app.getUserInfo(function(){
       var sign = wx.getStorageSync("sign");
       setTimeout(function(){
          that.setData({
             emailLevel:"none"
          })
       },50000)
       wx.request({
         url: 'https://single-dog.playonwechat.com/api/get-auditing-status?sign=' + sign,
         success(res){
           console.log(res);
           var ready = res.data.data.read_letter;
           if (ready) {
            that.setData({
              emailLevel:"none"
            })
             wx.redirectTo({
               url: '../index/index'
             })
           }
         }
       })
     })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
