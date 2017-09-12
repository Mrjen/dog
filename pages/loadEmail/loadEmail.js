// pages/loadEmail/loadEmail.js
var common = require("../../utils/comm.js");
var app = getApp();
Page({
  data: {
    ageArr: ['22'],
    indexAge: 7,
    indexSex: 0,
    indexHeight: 79,
    bodyHeight: [''],
    sexPicker: ['男', '女'],
    current:0,
    musicPlay:app.globalData.musicPlay,
    region:['北京市','北京市','东城区']
  },

  onLoad: function(options) {
    var that = this;
    console.log("页面参数",options);
    if (options&&options.type=="photo") {
       wx.setStorageSync("upAvatar",options.avatar);
       var wxCode = wx.getStorageSync("wxCode");
       that.setData({
         upAvatar:options.avatar,
         wxCode:wxCode
       })
    }else if (options&&options.type=="qrcode") {
      wx.setStorageSync("wxCode",options.avatar);
      var wxCode = wx.getStorageSync("wxCode");
      var upAvatar = wx.getStorageSync("upAvatar")
      that.setData({
         wxCode:options.avatar,
         upAvatar:upAvatar
      })
    }
    var that = this;
    var ageArr = [];
    var bodyHeight = [];
    var minAge = 12; //最小年龄
    var maxAge = 100; //最大年龄
    var minHeight = 80; //最小身高
    var maxHeight = 240; //最大身高

    var city = wx.getStorageSync("city");
    var province = wx.getStorageSync("province");
    var region = ['北京市','北京市','东城区'];
    if (city&&province) {
      region = [province,city];
    }

    for (var i = minAge; i < maxAge; i++) {
      minAge++;
      ageArr.push(minAge);
    }
    for (var i = minHeight; i < maxHeight; i++) {
      minHeight++;
      bodyHeight.push(minHeight);
    };
    that.setData({
      ageArr: ageArr, //年龄区间
      bodyHeight: bodyHeight, //身高区间
      region: region
    });

// 获取系统信息
  wx.getSystemInfo({
    success: function(res) {
      var system = res.platform;
      console.log(system);
      if (system=="ios") {
        console.log("IOS系统");

        that.setData({
          touchplayMusic:""
        });
        console.log(that.data);
      }else {
        console.log("安卓系统");
        that.setData({
          musicPlay:false,
          touchplayMusic:"playMusic"
        })
        console.log(that.data);
      }
    }
  })
},

playMusic:function(){
   common.playMusic();
   app.globalData.musicPlay = true;
   this.setData({
     musicPlay:true
   })
   console.log(app.globalData);
},

stopMusic:function(){
  common.stopMusic();
  this.setData({
    musicPlay:false
  })
},

  // load板块
upAvatar() {
    var that = this;
    var sign = wx.getStorageSync("sign");
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: function(res) {
        console.log(res);
        var src = res.tempFilePaths[0];
        var _url = "../loadEmail/loadEmail";
        wx.redirectTo({
          url: `../upload/upload?src=${src}&type=photo&url=${_url}`
        })
      }
    })
  },

  // 上传微信二维码
  wxCode: function() {
    var that = this;
    var sign = wx.getStorageSync("sign");
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: function(res) {
        console.log(res);
        var src = res.tempFilePaths[0];
        var _url = "../loadEmail/loadEmail";
        wx.redirectTo({
          url: `../upload/upload?src=${src}&type=qrcode&url=${_url}`
        })
      }
    })
  },

  // 身高
  bindPickerBodyHeight: function(e) {
    console.log(e);
    this.setData({
      indexHeight: e.detail.value
    })
  },

  // 年龄
  bindPickerAge: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      indexAge: e.detail.value
    })
  },

  // 性别
  bindPickerSex: function(e) {
    this.setData({
      indexSex: e.detail.value
    })
  },

  // 选择城市
  bindRegionChange: function(e) {
    console.log('我选择的地址为', e.detail.value)
    this.setData({
      region: e.detail.value
    });
  },

  // 确定个人信息
  sureInfo() {
    var that = this;
    var sign = wx.getStorageSync("sign");

    var sexPicker = that.data.sexPicker;
    var indexSex = that.data.indexSex;
    // 城市
    var region = that.data.region;
    // 年龄
    var indexAge = that.data.indexAge;
    var ageArr = that.data.ageArr;
    //身高
    var indexHeight = that.data.indexHeight;
    var bodyHeight = that.data.bodyHeight;

    var nickName = wx.getStorageSync("nickName");
    var avatarUrl = wx.getStorageSync("avatarUrl");

    var photo = wx.getStorageSync("upAvatar");
    var wxCode = wx.getStorageSync("wxCode");
    if (!photo) {
      wx.showToast({
       title: '请上传您美美的照片',
       icon: 'success',
       duration: 1000
      })
    }
    if (!wxCode) {
      wx.showToast({
       title: '请上传您的微信二维码',
       icon: 'success',
       duration: 1000
      })
    }
    var _sex = sexPicker[indexSex];
    if (_sex=="男") {
      _sex = 1;
    }else {
      _sex = 2;
    }
    var info = {
      wx_name:nickName,
      avatarUrl:avatarUrl,
      sex:_sex,
      age:ageArr[indexAge],
      height:bodyHeight[indexHeight],
      province:region[0],
      city:region[1],
      district:region[2],
      photo:photo,
      qrcode:wxCode
    }
    console.log("年龄",ageArr[indexAge],"性别",sexPicker[indexSex],"身高",bodyHeight[indexHeight],"城市",region);
    var str = "您选择的性别是“" + sexPicker[indexSex] + "”,数据提交之后不能修改，确定提交吗？";
    console.log(str);
    if (!avatarUrl&&!nickName) {
      common.getUser();
    }else {
      if (photo&&wxCode) {
        wx.showModal({
          title: '提示',
          content: str,
          success: function(res) {
            if (res.confirm) {
              console.log('用户点击确定');
              wx.request({
                url:'https://single-dog.playonwechat.com/api/save-user-info?sign='+sign,
                method:"POST",
                data:{
                  info:info
                },
                success:function(res){
                   console.log("用户信息保存成功");
                   wx.redirectTo({
                      url: '../index/index'
                   })
                }
              })
            } else if (res.cancel) {
              console.log('用户点击取消')
            }
          }
        })
      }
    }
  },

  onReady: function() {

  },

  onShow: function() {
    var that = this;
  },

  onHide: function() {

  },

  onUnload: function() {

  },

  onPullDownRefresh: function() {

  },

  onReachBottom: function() {

  },

  onShareAppMessage: function() {

  }
})
