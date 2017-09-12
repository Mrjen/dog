// pages/Wallet/Wallet.js
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
    console.log(options);
    var account = options.account;
    this.setData({
      account:account
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

// 充值
  bindChangeKeyInput:function(ev){
    var that = this;
    var change_money = ev.detail.value;
    that.setData({
       change_money:change_money
    })
  },

// 充值到钱包
  rechangeMyWallet:function(){
     var that = this;
     var change_money = that.data.change_money;
     var account = that.data.account;
     var sign = wx.getStorageSync("sign");
     wx.request({
       url: 'https://single-dog.playonwechat.com/api/recharge?sign=' + sign,
       data:{
         amount:change_money
       },
       success(res){
         wx.requestPayment({
             'timeStamp': res.data.data.timeStamp,
             'nonceStr': res.data.data.nonceStr,
             'package': res.data.data.package,
             'signType': 'MD5',
             'paySign': res.data.data.paySign,
             'success':function(res){
               console.log(res);
               console.log(account,change_money);
               var _account = Math.ceil((Number(account)+Number(change_money))*100)/100;

               console.log(_account);
               that.setData({
                 account:_account
               })
             },
             'fail':function(res){
               console.log(res);
             }
          })
       }
     })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

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
