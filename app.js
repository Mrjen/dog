//app.js
var common = require('/utils/comm.js');
App({
  onLaunch: function() {
    //调用API从本地缓存中获取数据
    wx.getSystemInfo({
      success: function (res) {
        var ScreenH = res.windowHeight;
        var kScreenW = res.windowWidth / 375;
        var kScreenH = res.windowHeight / 603;
        wx.setStorageSync('kScreenW', kScreenW);
        wx.setStorageSync('kScreenH', kScreenH);
        wx.setStorageSync('ScreenH', ScreenH);
        var system = res.platform;
        if (system=="ios") {
          wx.playBackgroundAudio({
              dataUrl: 'https://single-dog.playonwechat.com/static/music/background_music.wav',
              title: ' ',
              coverImgUrl: ' '
          });
        }else {

        }
      }
    });
  },

  getUserInfo: function(cb) {
    var that = this;
    if (this.globalData.userInfo) {
      typeof cb == "function" && cb(this.globalData.userInfo)
    } else {
      //调用登录接口
      wx.login({
        success(res){
          if (res.code) {
            wx.request({
              url:'https://single-dog.playonwechat.com/api/auth',
              data:{
                code:res.code
              },
              success(res){
                // console.log(res);
                wx.setStorageSync("sign",res.data.data.sign);
                wx.setStorageSync("sharecode",res.data.data.sharecode);
                wx.getUserInfo({
                  withCredentials: false,
                  success: function(res) {
                    // console.log(res);
                    common.getUser();
                    var userData = {};
                    var userInfo = res.userInfo;
                    var nickName = userInfo.nickName;
                    var avatarUrl = userInfo.avatarUrl;
                    wx.setStorageSync("avatarUrl",avatarUrl);
                    wx.setStorageSync("nickName",nickName);
                    userData = {
                      avatarUrl:userInfo.avatarUrl,
                      nickName:userInfo.nickName
                    }
                    that.globalData.userInfo = res.userInfo;
                    typeof cb == "function" && cb(that.globalData.userInfo);
                  }
                })

                // console.log(that.globalData);
              },
              fail(res){
                console.log("登录失败");
              }
            })
          }
        }
      })
    }
  },

onShow(){
   common.playMusic();
   wx.onBackgroundAudioStop(function(){
     common.playMusic();
   });
},

onHide:function(){
    common.stopMusic();
},

globalData: {
  userInfo: null,
  musicPlay:true
}
})
