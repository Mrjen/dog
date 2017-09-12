// pages/commonjs/commonjs.js
function getUser(){
  var wx_name = wx.getStorageSync('wx_name');
  var avatarUrl = wx.getStorageSync('avatarUrl');
   if (true) {
     wx.login({
       success:function(res){
         if (res.code) {
           wx.request({
            url: 'https://single-dog.playonwechat.com/api/auth',
            data: {
              code: res.code
            },
            success:function(res){
              var sign = res.data.data.sign;
              wx.setStorageSync('sign', res.data.data.sign);
              wx.setStorageSync('mid', res.data.data.mid);
              wx.setStorageSync('sharecode', res.data.data.sharecode);
              wx.getUserInfo({
                 success:function(res){
                    var userData = {};
                    var userInfo = res.userInfo;
                    var wx_name = userInfo.nickName;
                    var avatarUrl = userInfo.avatarUrl;
                    var gender = userInfo.gender;
                    var province = userInfo.province;
                    var city = userInfo.city;
                    var country = userInfo.country;
                    userData = {
                      wx_name: wx_name,
                      avatarUrl: avatarUrl,
                      gender: gender,
                      province: province,
                      city: city,
                      country: country
                    };
                    wx.setStorageSync('nickName', wx_name);
                    wx.setStorageSync('avatarUrl', avatarUrl);
                    wx.setStorageSync("city",city);
                    wx.setStorageSync("gender",gender);
                    wx.setStorageSync("province",province);
                    wx.request({
                      url: 'https://single-dog.playonwechat.com/api/get-auditing-status?sign='+sign,
                      success(res){
                        console.log(res);
                        var status = res.data.data.auditing;
                        wx.setStorageSync("status",status);
                        if (status=='0') {
                          wx.showModal({
                            title: '提示',
                            confirmText:'完成资料',
                            content: '系统检测到您没有完成个人资料',
                            success: function(res) {
                              if (res.confirm) {
                                wx.navigateTo({
                                 url: '../loadEmail/loadEmail'
                                })
                              } else if (res.cancel) {
                                console.log('用户点击取消')
                              }
                            }
                          })
                        }else if (status=='2') {
                          wx.showModal({
                            title: '提示',
                            confirmText:'重新上传',
                            content: '系统检测到您上传的微信二维码不正确',
                            success: function(res) {
                              if (res.confirm) {
                                wx.navigateTo({
                                 url: '../loadEmail/loadEmail'
                                })
                              } else if (res.cancel) {
                                console.log('用户点击取消')
                              }
                            }
                          })
                        }else if (status=='3') {
                          wx.showModal({
                            title: '提示',
                            confirmText:'确定',
                            content: '系统检测到您的资料正在审核中，请耐心等待',
                            success: function(res) {
                              if (res.confirm) {

                              } else if (res.cancel) {
                                console.log('用户点击取消')
                              }
                            }
                          })
                        }
                      }
                    })
                 },
                 fail:function() {
                   wx.showModal({
                     title:'提示',
                     confirmText:'前往授权',
                     content:'系统检测到您没有授权给有只单身狗',
                     success:function(res){
                       if (res.confirm) {
                         wx.openSetting({
                           success:(res) =>{
                             wx.getUserInfo({
                               success:function(res){
                                 var userData = {};
                                 var userInfo = res.userInfo;
                                 var wx_name = userInfo.nickName;
                                 var avatarUrl = userInfo.avatarUrl;
                                 var gender = userInfo.gender;
                                 var province = userInfo.province;
                                 var city = userInfo.city;
                                 var country = userInfo.country;
                                 wx.setStorageSync('nickName', wx_name);
                                 wx.setStorageSync('avatarUrl', avatarUrl);
                                 wx.setStorageSync("city",city);
                                 wx.setStorageSync("gender",gender);
                                 wx.setStorageSync("province",province);
                                 userData = {
                                   wx_name: wx_name,
                                   avatarUrl: avatarUrl,
                                   gender: gender,
                                   province: province,
                                   city: city,
                                   country: country
                                 };
                                //  wx.request({
                                //    url: 'https://single-dog.playonwechat.com/api/save-user-info?sign=' + sign,
                                //    method: "POST",
                                //    data: {
                                //      info: userData
                                //    },
                                //    success:function(res){
                                //       console.log("保存用户信息");
                                //    }
                                //  })
                               }
                             })
                           }
                         })
                       }else if (res.cancel) {
                         wx.showToast({
                            title: '用户授权失败',
                            icon: 'success',
                            duration: 1000
                          })
                       }
                     }
                   })
                 }
              })
            }
          })
          } else {
            console.log('获取用户登录态失败！' + res.errMsg)
          }
        //  }
       }
     })
   }
};

function getUserLocalPower(){
  wx.getSetting({
  success: (res) => {
    if (!res.authSetting['scope.userLocation']) {
      wx.showModal({
          title: '提示',
          content: '系统检测到您拒绝位置授权，无法获取您的地理位置，是否去开启授权？',
          success: function(res) {
           if (res.confirm) {
             wx.openSetting({
              success: (res) => {
                console.log(res);
              }
            })
           } else if (res.cancel) {
             console.log('用户点击取消')
           }
        }
      })
    }
  }
})
};

// 播放音乐
function playMusic(){
  wx.playBackgroundAudio({
      dataUrl: 'https://single-dog.playonwechat.com/static/music/background_music.mp3',
      title: ' ',
      coverImgUrl: ' '
  });
};

// 停止音乐
function stopMusic(){
  wx.pauseBackgroundAudio();
};

// 填写资料
function toEditModify(){
  wx.redirectTo({
   url: '../loadEmail/loadEmail'
  })
};

module.exports.playMusic = playMusic;
module.exports.stopMusic = stopMusic;
module.exports.getUser = getUser;
module.exports.getUserLocalPower = getUserLocalPower;
