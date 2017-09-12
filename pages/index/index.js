var common = require("../../utils/comm.js");
var markersData = [];
var app = getApp();
Page({
  data: {
    loadOut: "", //load层
    ageArr: [],
    mapScale: 16,
    indexAge: 0,
    indexSex: 0,
    indexHeight: 0,
    bodyHeight: ['155'],
    sexPicker: ['男','女'],
    outLeft: "11", //点击确认个人信息按钮出场动画
    displayMap: "block", //控制地图显示隐藏
    mapHidden:true,
    hasRecouse: false, //单身狗是否解救
    textContent:0,
    RedWallet:"",  //控制红包
    getwallet:"",  //点击领取红包
    userModifyStatus:1,  //用户资料状态
    markerData: [
    //   {
    //   id: 1,
    //   latitude: 114.234607,
    //   longitude: 22.692149,
    //   iconPath: "../img/marker.png"
    // }, {
    //   id: 2,
    //   latitude: 114.229352,
    //   longitude: 22.6935,
    //   iconPath: "../img/marker.png"
    // }, {
    //   id: 3,
    //   latitude: 114.231301,
    //   longitude: 22.690099,
    //   iconPath: "../img/marker.png"
    // }, {
    //   id: 4,
    //   latitude: 114.237877,
    //   longitude: 22.691849,
    //   iconPath: "../img/marker.png"
    // }, {
    //   id: 5,
    //   latitude: 114.240608,
    //   longitude: 22.690799,
    //   iconPath: "../img/marker.png"
    // }, {
    //   id: 6,
    //   latitude: 114.224384,
    //   longitude: 22.687765,
    //   iconPath: "../img/marker.png"
    // }, {
    //   id: 7,
    //   latitude: 114.235905,
    //   longitude: 22.690828,
    //   iconPath: "../img/marker.png"
    // }, {
    //   id: 8,
    //   latitude: 114.235445,
    //   longitude: 22.688955,
    //   iconPath: "../img/marker.png"
    // }
  ],
    controls: [{ //地图缩放按钮位置
      id: 1,
      iconPath: '/pages/img/wallet.png',
      position: {
        left: 320 * wx.getStorageSync("kScreenW"),
        top: 450 * wx.getStorageSync("kScreenH") - 20,
        width: 48,
        height: 48
      },
      clickable: true
    },
    // {
    //   id: 2,
    //   iconPath: '/pages/img/home_map_scale_less.png',
    //   position: {
    //     left: 320 * wx.getStorageSync("kScreenW"),
    //     top: 410 * wx.getStorageSync("kScreenH") - 15,
    //     width: 34,
    //     height: 34
    //   },
    //   clickable: true
    // },
    { //回到用户位置按钮
      id: 3,
      iconPath: '/pages/img/home_icon_userlocal.png',
      position: {
        left: 20 * wx.getStorageSync("kScreenW"),
        top: 420 * wx.getStorageSync("kScreenH"),
        width: 34,
        height: 34
      },
      clickable: true
    }, { //播放音乐按钮
      id: 4,
      iconPath: '/pages/img/home_icon_stopmusic.png',
      position: {
        left: 320 * wx.getStorageSync("kScreenW"),
        top: 20 * wx.getStorageSync("kScreenH"),
        width: 28,
        height: 28
      },
      clickable: true
    }, { //暂停音乐
      id: 5,
      iconPath: '/pages/img/home_icon_playmusic.png',
      position: {
        left: 320 * wx.getStorageSync("kScreenW"),
        top: 20 * wx.getStorageSync("kScreenH"),
        width: 28,
        height: 28
      },
      clickable: true
    }],// { //地图中心位置
    //  id: 6,
    //  iconPath: '/pages/img/home_icon_position.png',
    //  position: {
    //    left: 177.5 * wx.getStorageSync("kScreenW"),
    //    top: wx.getStorageSync("kScreenH")*wx.getStorageSync("ScreenH")/2-64,
    //    width: 20,
    //    height: 45
    //  },
    //  clickable: false
    // }],
    dogFood: [],
    infoCard: false, //控制单身狗资料卡显示隐藏
    foodMall: false, //控制商城是否显示
    dogFoodCard: false, //控制狗粮卡是否显示
    hasFoodCard: false, //控制倒计时是否显示
    dogManAvatar:['../img/dog_man01.png',   //男单身狗图标
                  '../img/dog_man02.png',
                  '../img/dog_man03.png',
                  '../img/dog_man04.png',
                  '../img/dog_man05.png',
                  '../img/dog_man06.png',
                  '../img/dog_man07.png',
                  '../img/dog_man08.png',
                  '../img/dog_man09.png'],

    dogWomanAvatar:['../img/dog_woman01.png',   //女单身狗图标
                    '../img/dog_woman02.png',
                    '../img/dog_woman03.png',
                    '../img/dog_woman04.png',
                    '../img/dog_woman05.png',
                    '../img/dog_woman06.png',
                    '../img/dog_woman07.png',
                    '../img/dog_woman08.png',
                    '../img/dog_woman09.png']
  },


  onLoad: function(e) {
    var that = this;
    var avatar = e.avatar; //裁切的图像
    var ageArr = [];
    var bodyHeight = [];
    var minAge = 18; //最小年龄
    var maxAge = 50; //最大年龄
    var minHeight = 150; //最小身高
    var maxHeight = 185; //最小身高
    for (var i = minAge; i < maxAge; i++) {
      minAge++;
      ageArr.push(minAge);
    }
    for (var i = minHeight; i < maxHeight; i++) {
      minHeight++;
      bodyHeight.push(minHeight);
    };

    var iconNumArr = [];
    for (var i = 0; i < 8; i++) {
      iconNumArr[i] = RandomNumBoth(0,8);
    }
    console.log(iconNumArr);
    that.setData({
      ageArr: ageArr, //年龄区间
      bodyHeight: bodyHeight, //身高区间
      iconNumArr:iconNumArr
    });
    if (avatar) {
      that.setData({
        upAvatar: avatar,
      })
    };
  },

  onReady: function(e) {
    // 使用 wx.createMapContext 获取 map 上下文
    this.mapCtx = wx.createMapContext('map');
  },

  // 页面显示
  onShow: function() {
    var that = this;
    wx.hideShareMenu();
    setTimeout(function() {
      that.setData({
        fadeOutLeft:"fadeOutLeft"
      })
    },1000);
    setTimeout(function() {
      that.setData({
        mapHidden:false
      })
    },1500)
    wx.showLoading({
      title: '加载中',
    });
    app.getUserInfo(function() {
      var sign = wx.getStorageSync("sign");
      var avatarUrl = wx.getStorageSync("avatarUrl");
      var nickName = wx.getStorageSync("nickName");
      that.setData({
        avatarUrl:avatarUrl,
        nickName:nickName
      })
      wx.getLocation({
        type: 'gcj02',
        success: function(res) {
          //console.log("当前坐标", res);
          that.setData({
            latitude: res.latitude,
            longitude: res.longitude,
            circles: [{
              latitude: res.latitude,
              longitude: res.longitude,
              fillColor: '#7cb5ec88',
              radius: 500,
              color: "#ffffff00"
            }],
          });
          //console.log(that.data);
          that.moveToLocation();
          wx.request({
            url: "https://single-dog.playonwechat.com/api/homepage?sign=" + sign,
            data: {
              latitude: res.latitude,
              longitude: res.longitude
            },
            success: function(res) {
              console.log(res);
              var ModifyData = res.data.data.pageinfo.auditing;

              if (ModifyData!=='1') {
                var userModifyStatus = that.data.userModifyStatus;
                if (userModifyStatus) {
                  common.getUser();
                  that.setData({
                    userModifyStatus:0
                  })
                  setTimeout(function(){
                    that.setData({
                      userModifyStatus:1
                    },900000)
                  })
                }
              }

              var foodicon = "/pages/img/marker_food.png";
              // var dogicon = "/pages/img/marker_dog_foot.png";
              var cangetfood = "/pages/img/can_get_dog_food.png";
              var hasReceiveFood = "/pages/img/marker_has_receive_food.png";
              var red_packets_icon = "/pages/img/home_red_packet.png";
              var dogManAvatar =  that.data.dogManAvatar;
              var dogWomanAvatar = that.data.dogWomanAvatar;
              var iconNumArr = that.data.iconNumArr;

              var dogfood = res.data.data.pageinfo.dog_food;            //狗粮
              var dogs = res.data.data.pageinfo.dogs;                   //单身狗
              var redPackets = res.data.data.pageinfo.red_packets;      //红包
              var walkDistance = res.data.data.pageinfo.walking_distance;
              var level = res.data.data.pageinfo.level;
              var account = res.data.data.pageinfo.account;

              var markerData = [];
              var prograss = new Number();
                  prograss = parseInt(200/(level*level*1000 - (level-1)*(level-1)*1000)*walkDistance);
              console.log("prograss",prograss);
              for (let i = 0; i < dogfood.length; i++) {
                if (dogfood[i].is_receive == 0) {
                  dogfood[i].iconPath = foodicon;
                } else {
                  dogfood[i].iconPath = hasReceiveFood;
                }
                dogfood[i].width = 60;
                dogfood[i].height = 60;
                dogfood[i].latitude = Number(dogfood[i].latitude);
                dogfood[i].longitude = Number(dogfood[i].longitude);
                dogfood[i].title = "狗粮：当您距离50米内即可领取";
              }
              if (dogs.length>0) {
                 var j = 0;
                for (let i = 0; i < dogs.length; i++) {
                  if (dogs[i].sex=="1") {
                     dogs[i].iconPath = dogManAvatar[iconNumArr[j]];
                  }else {
                     dogs[i].iconPath = dogWomanAvatar[iconNumArr[j]];
                  }
                  j++;
                  if (j>iconNumArr.length) {
                     j = 0;
                  }
                  // dogs[i].iconPath = dogicon;
                  dogs[i].width = 44;
                  dogs[i].height = 56;
                  dogs[i].latitude = Number(dogs[i].latitude);
                  dogs[i].longitude = Number(dogs[i].longitude);
                  dogs[i].title = "单身狗：当您距离单身狗100米内即可解救";
                }
                markerData = dogfood.concat(dogs);
              }else {
                markerData = dogfood;
              };
              if (redPackets.length>0) {
                 for (let i = 0; i < redPackets.length; i++) {
                    redPackets[i].iconPath = red_packets_icon;
                    redPackets[i].width = 42;
                    redPackets[i].height = 52;
                    redPackets[i].latitude = Number(redPackets[i].latitude);
                    redPackets[i].longitude = Number(redPackets[i].longitude);
                 }
                 markerData = markerData.concat(redPackets);
              }else {
                markerData = markerData;
              }
         console.log("markerData",markerData);
              that.setData({
                markerData: markerData,
                avatarUrl: avatarUrl,
                nickName: nickName,
                level:level,
                account:account,
                prograss:prograss,
                walkDistance:walkDistance,
                Notice:res.data.data.pageinfo.notice,
                nav_food_num: res.data.data.pageinfo.dog_food_num,
                nav_rescue_num: res.data.data.pageinfo.rescue_number
              });
              setTimeout(function(){
                wx.hideLoading()
              },500)
            }
          })
        },
        fail: function(res) {
          setTimeout(function(){
            wx.hideLoading()
          },500)
          common.getUserLocalPower();
        }
      });
      //  商店狗粮
      wx.request({
        url: 'https://single-dog.playonwechat.com/api/dog-food-list?sign=' + sign,
        success(res) {
          //console.log(res);
          var dogFood = res.data.data;
          that.setData({
            dogFood: dogFood
          })
        }
      })
    })
    wx.getSystemInfo({
      success: function (res) {
        var system = res.platform;
        var controls = that.data.controls;
        if (system!=="ios") {
          for (var i = 0; i < controls.length; i++) {
            if (controls[i].id==4) {
              // 这里筛选出安卓手机，设置安卓手机为不播放状态
               controls[i].position.width = 38;
               controls[i].position.height = 38;
              // console.log(controls[i]);
            }else if (controls[i].id==5) {
              controls[i].position.width = 2;
              controls[i].position.height = 2;
            }
          }
        }else {
          for (var i = 0; i < controls.length; i++) {
            if (controls[i].id==4) {
              // 这里筛选出安卓手机，设置安卓手机为不播放状态
               controls[i].position.width = 2;
               controls[i].position.height = 2;
            }else if (controls[i].id==5) {
              controls[i].position.width = 38;
              controls[i].position.height = 38;
            }
          }
        }
        that.setData({
          controls:controls
        });
      }
    });
  },

  // 拖动地图
  regionchange(e) {
    var that = this
    console.log("视野发生变化",e.type);
    app.getUserInfo(function(){
      var sign = wx.getStorageSync("sign");
      wx.getLocation({
        type: 'gcj02',
        success(res) {
          // console.log(res);
          var user_latitude = res.latitude;
          var user_longitude = res.longitude;
          wx.request({
            url: "https://single-dog.playonwechat.com/api/homepage?sign=" + sign,
            data: {
              latitude: res.latitude,
              longitude: res.longitude
            },
            success(res) {
             console.log("res",res);
              var foodicon = "/pages/img/marker_food.png";
              //var dogicon = "/pages/img/marker_dog_foot.png";   //单身狗图标
              var footicon = "/pages/img/marker_dog_foot.png";
              var cangetfood = "/pages/img/can_get_dog_food.png";
              var hasReceiveFood = "/pages/img/marker_has_receive_food.png";
              var red_packets_icon = "/pages/img/home_red_packet.png";

              var dogManAvatar =  that.data.dogManAvatar;
              var dogWomanAvatar = that.data.dogWomanAvatar;
              var iconNumArr = that.data.iconNumArr;    //单身狗头像随机数组
              var dogfood = res.data.data.pageinfo.dog_food;
              var dogs = res.data.data.pageinfo.dogs;
              var redPackets = res.data.data.pageinfo.red_packets;      //红包
              var markerData = [];



              for (let i = 0; i < dogfood.length; i++) {
                if (dogfood[i].is_receive == 0) {
                  dogfood[i].iconPath = foodicon;
                } else {
                  dogfood[i].iconPath = hasReceiveFood;
                }
                dogfood[i].width = 60;
                dogfood[i].height = 60;
                dogfood[i].latitude = Number(dogfood[i].latitude);
                dogfood[i].longitude = Number(dogfood[i].longitude);
              }
              //console.log("狗粮2",dogfood);

              if (dogs.length>0) {
                var j = 0;
                for (let i = 0; i < dogs.length; i++) {
                  if (dogs[i].sex=="1") {
                    dogs[i].iconPath = dogManAvatar[iconNumArr[j]];
                  }else {
                    dogs[i].iconPath = dogWomanAvatar[iconNumArr[j]];
                  };
                  j++;
                  if (j>iconNumArr.length) {
                     j = 0;
                  }
                  dogs[i].width = 44;
                  dogs[i].height = 56;
                  dogs[i].latitude = Number(dogs[i].latitude);
                  dogs[i].longitude = Number(dogs[i].longitude);
                }
                 markerData = dogfood.concat(dogs);
              }else {
                markerData = dogfood;
              }

              //console.log("单身狗2",dogs);

              if (redPackets.length>0) {
                 for (let i = 0; i < redPackets.length; i++) {
                    redPackets[i].iconPath = red_packets_icon;
                    redPackets[i].width = 42;
                    redPackets[i].height = 52;
                    redPackets[i].latitude = Number(redPackets[i].latitude);
                    redPackets[i].longitude = Number(redPackets[i].longitude);
                 }
                 markerData = markerData.concat(redPackets);
              }else {
                markerData = markerData;
              }

              console.log("红包2",redPackets,"markerData2",markerData);

              let distanceLatitude = new Number();
              let distanceLongitude = new Number();

              // console.log(markerData);
              // console.log(user_latitude,user_longitude);
              for (var i = 0; i < markerData.length; i++) {
                markerData[i].distanceLatitude = Math.abs(user_latitude - markerData[i].latitude) / 0.00001;
                markerData[i].distanceLongitude = Math.abs(user_longitude - markerData[i].longitude) / 0.000009;
                var distance = Math.sqrt(markerData[i].distanceLatitude * markerData[i].distanceLatitude + markerData[i].distanceLongitude * markerData[i].distanceLongitude);
                // console.log(distance);
                if (distance < 100 && 0.1<= markerData[i].id < 1) {
                  //这里输出单身狗
                  markerData[i].iconPath = dogicon;
                  // console.log(markerData[i]);
                } else if (distance < 50 && markerData[i].id >= 1&&markerData[i].is_receive=="0"){
                  //这里输出可领取的狗粮
                  markerData[i].iconPath = cangetfood;
                }else if (distance < 50&& 0<markerData[i].id<0.1) {
                  //这里输出可领取的红包
                  markerData[i].iconPath = red_packets_icon;
                }
              }
              that.setData({
                markerData: markerData,
                longitude: res.longitude,
                latitude: res.latitude,
                Notice:res.data.data.pageinfo.notice
              })
            },
            fail(res){
              common.getUserLocalPower();
            }
          })
        }
      })
    })
  },

  // 点击地图的marker
  markertap(e) {
    var _that = this;
    // console.log(e.markerId);
    var sign = wx.getStorageSync("sign");
    var markerData = _that.data.markerData;
    var longitude = new Number();
    var latitude = new Number();
    for (let i = 0; i < markerData.length; i++) {
      if (markerData[i].id == e.markerId) {
        // console.log(markerData[i]);
        longitude = Number(markerData[i].longitude);
        latitude = Number(markerData[i].latitude);
      }
    }
    // console.log(longitude, latitude);
    wx.getLocation({
      type: 'gcj02',
      success(res) {
        //console.log(res);
        let distanceLatitude = new Number();
        let distanceLongitude = new Number();
        let user_latitude = res.latitude;
        let user_longitude = res.longitude;
        distanceLatitude = Math.abs(user_latitude - latitude) / 0.00001;
        distanceLongitude = Math.abs(user_longitude - longitude) / 0.000009;
        var distance = Math.sqrt(distanceLatitude * distanceLatitude + distanceLongitude * distanceLongitude);
        console.log("distance",distance);
        console.log(_that);
        _that.setData({
          distance: distance,
          user_latitude:user_latitude,
          user_longitude:user_longitude
        });
        console.log("e.markerId",e.markerId);
        if (0.1 <= e.markerId&& e.markerId< 1) {
          //此maker是单身狗
          console.log("此maker是单身狗", e.markerId);
          // var distance = _that.data.distance;
          // console.log(distance);

          if (distance < 100) {
            // console.log("小于100");
            wx.vibrateLong();
            //这里是单身狗距离100米内的情况
            var _expend = new Number();
            var _type = "";
            var markerData = _that.data.markerData;
            for (var i = 0; i < markerData.length; i++) {
              if (markerData[i].id == e.markerId) {
                // console.log(markerData[i]);
                _expend = markerData[i].expend;
                _type = markerData[i].type;
              }
            }
            let _id = e.markerId.split(".");
            _id = Number(_id[1]);
            // console.log("_id", _id, "type", _type, "expend", _expend);
            wx.request({
              url: "https://single-dog.playonwechat.com/api/dog-detail?sign=" + sign,
              data: {
                uid: _id
              },
              success(res) {
                console.log(res);
                var dogInfo = res.data.data.dogInfo;
                // 不管是单身狗还是狗粮先把需要的ID、expend返回去
                var xueli = dogInfo.education;
                if (xueli == "0") {
                  xueli = "未知"
                } else if (xueli == "1") {
                  xueli = "幼儿园"
                } else if (xueli == "2") {
                  xueli = "小学"
                } else if (xueli == "3") {
                  xueli = "初中"
                } else if (xueli == "4") {
                  xueli = "高中"
                } else if (xueli == "5") {
                  xueli = "专科"
                } else if (xueli == "6") {
                  xueli = "本科"
                } else if (xueli == "7") {
                  xueli = "硕士"
                } else if (xueli == "8") {
                  xueli = "博士"
                } else if (xueli == "9") {
                  xueli = "其他"
                };
                dogInfo.education = xueli;
                _that.setData({
                  uid: _id,
                  dogInfo: dogInfo
                });
              }
            })
            // 判断解救状态
            if (_type == 0) {
              //解救失败
              _that.setData({
                infoCard: true,
                expend: _expend,
                displayMap: "none",
                hasRecouse: true,
                dogInfoBox: true,
                failRecouse: true,
                hasDogFood: false,
                giveDogInfo: false,
                cardaInOut: "card_in"
              })

            } else if (_type == 1) {
              //未解救
              _that.setData({
                infoCard: true,
                expend: _expend,
                displayMap: "none",
                hasRecouse: false,
                dogInfoBox: true,
                failRecouse: false,
                hasDogFood: false,
                giveDogInfo: false,
                cardaInOut: "card_in"
              })
            } else if (_type == 2) {
              //解救成功
              _that.setData({
                infoCard: true,
                expend: _expend,
                displayMap: "none",
                hasRecouse: true,
                dogInfoBox: true,
                failRecouse: false,
                hasDogFood: false,
                giveDogInfo: true,
                cardaInOut: "card_in"
              })

            } else if (_type == 3) {
              //解救中
              _that.setData({
                infoCard: true,
                expend: _expend,
                displayMap: "none",
                hasRecouse: true,
                dogInfoBox: true,
                failRecouse: false,
                hasDogFood: true,
                giveDogInfo: false,
                cardaInOut: "card_in"
              })
            }

          } else {
            //这里是单身狗距离大于100米的情况
            _that.setData({
              rescueDogTip:"单身狗，距离大于50米不可解救",
              TipBox:true
            });
            setTimeout(function(){
              _that.setData({
                 TipBox:false
              })
            },2500)
          }

        }else if(e.markerId>=1){
          //此maker是狗粮
          console.log("这里是狗粮",e.markerId);
          var food_status = "";
          // var distance = _that.data.distance;
          var markerData = _that.data.markerData;
          for (var i = 0; i < markerData.length; i++) {
            if (markerData[i].id == e.markerId) {
              console.log(markerData[i]);
              _expend = markerData[i].food_number;
              food_status = markerData[i].is_receive;
            }
          }
          console.log("狗粮是否被领取", food_status);
          _that.setData({
            expend: _expend
          })
          console.log(_expend);
          if (food_status == "0") {
            if (distance < 50) {
              // 本人与狗粮距离小于50米则可领取狗粮
              wx.request({
                url: 'https://single-dog.playonwechat.com/api/obtain-dog-food?sign=' + sign,
                data: {
                  fid: e.markerId,
                  longitude: longitude,
                  latitude: latitude
                },
                success(res) {
                  console.log(res);
                  var hasReceiveFood = "/pages/img/marker_has_receive_food.png";
                  console.log(markerData);
                  for (var i = 0; i < markerData.length; i++) {
                    if (markerData[i].id == e.markerId) {
                      markerData[i].iconPath = hasReceiveFood;
                    }
                  }
                  console.log(_expend);
                  _that.setData({
                    markerData: markerData,
                    expend: _expend,
                  });
                  var _title = "恭喜您领取到"+_expend+"份狗粮";
                  wx.showToast({
                    title:_title,
                    icon: 'success',
                    duration: 1000
                  })
                  if (res.firstTime) {
                    setTimeout(function() {
                      _that.setData({
                        dogFoodCard: true
                      })
                    }, 3000);
                  }
                }
              })
            } else {
              //如果距离大于50米在这里可以做提示操作
              _that.setData({
                DogTip: true,
                displayMap: "none",
                openDogTip: "dog_food_tip",
                rescueDogTip:"狗粮，距离小于100米，可以领取",
                TipBox:true
              });
              setTimeout(function(){
                _that.setData({
                  TipBox:false
                })
              },2500)
            }
          } else if (food_status == "1") {
            wx.showToast({
              title: '狗粮已被领取',
              icon: 'success',
              duration: 1000
            })
          }
        }else if (0<e.markerId&&e.markerId<0.1) {
           console.log("点击了红包",e.markerId);
           if (distance<50) {
             var markerData = _that.data.markerData;
             var redPacketNum = new Number();
             var distance = _that.data.distance;
             var _longitude = new Number();
             var _latitude = new Number();
             for (let i = 0; i < markerData.length; i++) {
               if (markerData[i].id==e.markerId) {
                  redPacketNum = markerData[i].amount;
                  _longitude = markerData[i].longitude;
                  _latitude = markerData[i].latitude;
               }
             };

             _that.setData({
               rid:e.markerId,
               red_longitude:_longitude,
               red_latitude:_latitude,
               RedWallet:"RedWallet",
               redWalletDisplay:"block",
               displayMap:"none",
               redPacketNum:redPacketNum
            });
          }else {
            _that.setData({
              rescueDogTip:"现金红包，距离大于50米不可以领取",
              TipBox:true
            });
            setTimeout(function(){
              _that.setData({
                TipBox:false
              })
            },2500)
          }
        }
      },
      fail(res) {
        console.log("用户没有授权地理位置");
      }
    });
  },

  // 领取狗粮
  getDogFoodBtn: function() {

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

  // 关闭狗粮提示卡片
  CloseDogTip: function() {
    this.setData({
      DogTip: false,
      displayMap: "block"
    })
  },

  // 解救单身狗
  rescueHer: function(ev) {
    console.log(ev);
    var that = this;
    var _id = that.data.uid;
    var _expend = that.data.expend;
    var distance = that.data.distance;
    var user_latitude = that.data.user_latitude;
    var user_longitude = that.data.user_longitude;
    var sign = wx.getStorageSync("sign");
    if (distance < 100) {
      wx.request({
        url: 'https://single-dog.playonwechat.com/api/rescue-dog?sign=' + sign,
        data: {
          uid: _id,
          expend: _expend,
          latitude:user_latitude,
          longitude:user_longitude
        },
        success(res) {
          console.log(res);
          if (res.data.status!==0) {
            that.setData({
              infoCard: true,
              expend: _expend,
              displayMap: "none",
              hasRecouse: true,
              dogInfoBox: true,
              failRecouse: false,
              hasDogFood: true,
              giveDogInfo: false
            });
            wx.showToast({
              title: res.data.msg,
              icon: 'success',
              duration: 2000
            })
          }else {
            wx.showToast({
              title: res.data.msg,
              icon: 'success',
              duration: 2000
            })
          }

        }
      });
      wx.request({
        url: 'https://single-dog.playonwechat.com/api/change-open?sign=' + sign,
        data: {
          uid: _id
        },
        success(res) {
          console.log(res);
        }
      })
    }
  },



  // 地图图标点击
  controltap(e) {
    var that = this;
    var mapScale = that.data.mapScale;
    var account = that.data.account;
    if (e.controlId == 1) {
       console.log("我点击的是钱包");
       wx.navigateTo({
          url: '../Wallet/Wallet?account='+account
        })
    } else if (e.controlId == 2) {


    }else if (e.controlId == 3) {
      console.log("返回用户中心");
      wx.getSetting({
        success: (res) => {
          if (res.authSetting['scope.userLocation']) {
            this.moveToLocation();
          } else {
            common.getUserLocalPower();
          }
        }
      })
    }else if (e.controlId == 4) {
      //  播放音乐
      var controls = that.data.controls;
      common.playMusic();
      for (var i = 0; i < controls.length; i++) {
        if (controls[i].id==4) {
          // 这里筛选出安卓手机，设置安卓手机为不播放状态
           controls[i].position.width = 2;
           controls[i].position.height = 2;
        }else if (controls[i].id==5) {
          controls[i].position.width = 38;
          controls[i].position.height = 38;
        }
      }
      that.setData({
        controls:controls
      })
    }else if (e.controlId == 5) {
      // 暂停音乐
      var controls = that.data.controls;
      common.stopMusic();
      for (var i = 0; i < controls.length; i++) {
        if (controls[i].id==4) {
          // 这里筛选出安卓手机，设置安卓手机为不播放状态
           controls[i].position.width = 38;
           controls[i].position.height = 38;
        }else if (controls[i].id==5) {
          controls[i].position.width = 2;
          controls[i].position.height = 2;
        }
      }
      that.setData({
        controls:controls
      })
    }
    that.setData({
      mapScale: mapScale
    });
  },

  // 移动位置
  moveToLocation: function() {
    this.mapCtx.moveToLocation();
    console.log("移动位置");
  },

  // 个人中心
  toPersionCenter: function() {
    wx.navigateTo({
      url: '../Mine/Mine'
    })
  },

  // 消息通知
  toNotice: function() {
    wx.navigateTo({
      url: '../Notice/Notice'
    })
  },

  // 我解救的单身狗
toMyRescue:function(){
  wx.navigateTo({
    url: '../myRescue/myRescue'
  })
},

// 打开红包
OpenRedWallet:function(){
  console.log("领到红包了");

},

// 领取红包
getRedWallet:function(){
   var that = this;
   var red_longitude = that.data.red_longitude;
   var red_latitude = that.data.red_latitude;
   var distance = that.data.distance;
   var rid = that.data.rid;
   var markerData = that.data.markerData;
   console.log(markerData);
   var sign = wx.getStorageSync("sign");
   wx.request({
     url: 'https://single-dog.playonwechat.com/api/obtain-red-packet?sign=' + sign,
     data:{
       rid:rid.slice(3),
       longitude:red_longitude,
       latitude:red_latitude
     },
     success(res){
       console.log(res);
       if (res.data.status=="1") {
           for (var i = 0; i < markerData.length; i++) {
             if (markerData[i].id==rid) {
               console.log(markerData[i],i);
                markerData.splice(i,1);
             }
           };
           that.setData({
             markerData:markerData
           })
       }else {
         wx.showToast({
           title: res.data.msg,
           icon: 'success',
           duration: 1000
          })
       }
     }
   })

   that.setData({
     getwallet:"getwallet",

   });
   setTimeout(function(){
     that.setData({
       redWalletDisplay:"none",
       HasGetRedWallet:"HasGetRedWallet"
     })
   },2000)
},

// 关闭未打开的红包
closeWallet:function(){
  this.setData({
    redWalletDisplay:"none",
    RedWallet:"",
    displayMap:"block"
  })
},

// 关闭红包
closeGetWallet:function(){
   this.setData({
     HasGetRedWallet:"CloseHasGetRedWallet",
     RedWallet:"",
     HasGetRedWallet:"",
     getwallet:"",
     displayMap:"block"
   })
},

  //关闭资料卡
  closeCard: function() {
    var that = this;
    that.setData({
      //  cardOut:"card_out",
      //  cardDisplay:"card_box",
      infoCard: false,
      displayMap: "block"
    });
  },

  // 关闭狗粮卡
  closeFoodCard: function() {
    var that = this;
    that.setData({
      dogFoodCard: false,
      displayMap: "block"
    })
  },

  // 打开商城
  openMall: function() {
    var that = this;
    that.setData({
      foodMall: true,
      displayMap: "none"
    });
  },

// 打开商城
  buyDogFood: function() {
    var that = this;
    that.setData({
      foodMall: true,
      displayMap: "none"
    });
  },

  // 关闭商城
  closeMall: function() {
    var that = this;
    var infoCard = that.data.infoCard;
    if (infoCard) {
      that.setData({
        foodMall: false,
        displayMap: "none"
      });
    } else {
      that.setData({
        foodMall: false,
        displayMap: "block"
      });
    }
  },

toHelp:function(){
  wx.navigateTo({
    url: '../Help/Help'
  })
},

// 相册预览
prewPhoto:function(ev){
   var _src = ev.currentTarget.src;
   wx.previewImage({
      current: _src[0], // 当前显示图片的http链接
      urls: _src // 需要预览的图片http链接列表
    })
},

  onShareAppMessage: function(res) {
    var that = this;
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: '快来帮我解救这只单身狗',
      path: '/pages/index/index',
      success: function(res) {
        // 转发成功
        console.log("转发成功");
        var sign = wx.getStorageSync("sign");
        wx.request({
          url: "https://single-dog.playonwechat.com/api/get-vip-card?sign=" + sign,
          success(res) {
            console.log(res);
            var time = 1800;
            var count_down = "";
            var _time = setInterval(function() {
              time = time - 1;
              if (time == 0) {
                clearInterval(_time);
                that.setData({
                  hasFoodCard: false
                })
              }
              count_down = dateformat(time);
              that.setData({
                countDown: count_down,
                dogFoodCard: false,
                hasFoodCard: true
              });
            }, 1000);
          }
        })
        console.log(dateformat(1800));
      },
      fail: function(res) {
        // 转发失败
        console.log("转发失败");
      }
    }
  }
});

function dateformat(second) {
  var dateStr = "";
  var hr = Math.floor(second / 3600);
  var min = Math.floor((second - hr * 3600) / 60);
  var sec = (second - hr * 3600 - min * 60);
  if (min < 10) {
    min = "0" + min;
  }
  if (sec < 10) {
    sec = "0" + sec;
  }
  dateStr = min + ":" + sec;
  return dateStr;
};

function RandomNumBoth(Min,Max){      
  var Range = Max - Min;       
  var Rand = Math.random();       
  var num = Min + Math.round(Rand * Range); //四舍五入       
  return num;
}
