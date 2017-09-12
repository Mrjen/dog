// pages/myRescue/myRescue.js
Page({
  data: {
    list: [],
    showInfo: false,
    loadEnd:true
  },

  onLoad: function(options) {
    console.log(options);
    var that = this;
    if (options.did) {
       console.log("我是从通知来的");
       var sign = wx.getStorageSync("sign");
       wx.request({
         url:'https://single-dog.playonwechat.com/api/rescue-dog-detail?sign='+sign,
         data:{
           did:options.did
         },
         success(res){
            console.log(res);
            var dogInfo = res.data.data.dogInfo;
            if (dogInfo.education == "0") {
              dogInfo.education = "未知"
            } else if (dogInfo.education == "1") {
              dogInfo.education = "幼儿园"
            } else if (dogInfo.education == "2") {
              dogInfo.education = "小学"
            } else if (dogInfo.education == "3") {
              dogInfo.education = "初中"
            } else if (dogInfo.education == "4") {
              dogInfo.education = "高中"
            } else if (dogInfo.education == "5") {
              dogInfo.education = "专科"
            } else if (dogInfo.education == "6") {
              dogInfo.education = "本科"
            } else if (dogInfo.education == "7") {
              dogInfo.education = "硕士"
            } else if (dogInfo.education == "8") {
              dogInfo.education = "博士"
            } else if (dogInfo.education == "9") {
              dogInfo.education = "其他"
            };
            if (dogInfo.type==1) {
                 //未解救
                 that.setData({
                   dogInfo:dogInfo,
                   infoCard:true,
                   hasRecouse:false,
                   failRecouse:false,
                   hasDogFood:false,
                   giveDogInfo:false
                 })
               }else if (dogInfo.type==2) {
                 //解救成功
                 that.setData({
                   dogInfo:dogInfo,
                   infoCard:true,
                   hasRecouse:true,
                   failRecouse:false,
                   hasDogFood:false,
                   giveDogInfo:true,
                   hasAgree:true
                 })
               }
         }
       })
    }

    that.setData({
      pageData:options.frompage
    })
  },

  onReady: function() {

  },

  onShow: function() {
    var that = this;
    var sign = wx.getStorageSync("sign");
    var avatarUrl = wx.getStorageSync("avatarUrl");
    var nickName = wx.getStorageSync("nickName");
    var pageData = that.data.pageData;
      wx.request({
        url:'https://single-dog.playonwechat.com/api/rescue-list?sign='+sign,
        success(res){
          console.log(res);
          var list = res.data.data.rescueList;
          console.log(list);
          that.setData({
            list:list,
            avatarUrl: avatarUrl,
            nickName: nickName
          });
          console.log(that.data);
        }
      })
  },

  // 查看资料
  seeInfo: function(ev) {
    // console.log(ev);
    var that = this;
    var _type = ev.currentTarget.dataset.type;
    var _expend = ev.currentTarget.dataset.expend;
    var _did = ev.currentTarget.dataset.did;
    var sign = wx.getStorageSync("sign");
    console.log("_type",_type,"_expend",_expend);
    wx.request({
      url:'https://single-dog.playonwechat.com/api/rescue-dog-detail?sign='+sign,
      data:{
        did:_did
      },
      success(res){
         console.log(res);
         var dogInfo = res.data.data.dogInfo;
         if (dogInfo.education == "0") {
           dogInfo.education = "未知"
         } else if (dogInfo.education == "1") {
           dogInfo.education = "幼儿园"
         } else if (dogInfo.education == "2") {
           dogInfo.education = "小学"
         } else if (dogInfo.education == "3") {
           dogInfo.education = "初中"
         } else if (dogInfo.education == "4") {
           dogInfo.education = "高中"
         } else if (dogInfo.education == "5") {
           dogInfo.education = "专科"
         } else if (dogInfo.education == "6") {
           dogInfo.education = "本科"
         } else if (dogInfo.education == "7") {
           dogInfo.education = "硕士"
         } else if (dogInfo.education == "8") {
           dogInfo.education = "博士"
         } else if (dogInfo.education == "9") {
           dogInfo.education = "其他"
         };
         that.setData({
           dogInfo:dogInfo
         })
      }
    })
    // 判断解救状态
 if (_type==1) {
      //未解救
      that.setData({
        infoCard:true,
        expend:_expend,
        hasRecouse:false,
        dogInfo:true,
        failRecouse:false,
        hasDogFood:false,
        giveDogInfo:false
      })
    }else if (_type==2) {
      //解救成功
      that.setData({
        infoCard:true,
        expend:_expend,
        displayMap:"none",
        hasRecouse:true,
        dogInfo:true,
        failRecouse:false,
        hasDogFood:false,
        giveDogInfo:true,
        hasAgree:true
      })
    }
  },

  // 在这里解救
  RescueHe:function(ev){
    console.log(ev);
     var that = this;
     var _uid = ev.currentTarget.dataset.mid;
     var _expend = ev.currentTarget.dataset.expend;
     var sign = wx.getStorageSync("sign");
     console.log(_uid,_expend);
     wx.request({
       url:'https://single-dog.playonwechat.com/api/rescue-dog?sign='+sign,
       data:{
         uid:_uid,
         expend:_expend
       },
       success(res){
         console.log(res);
         if (res.data.status!==0) {
           var list = that.data.list;
           for (var i = 0; i < list.length; i++) {
             if (list[i].mid ==_uid) {
                list[i].type="3"
             }
           }
           that.setData({
             list:list,
             hasRecouse:true,
             hasDogFood:true,
             giveDogInfo:false,
             hasAgree:false
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
  },

  // 关闭资料卡
  closeCard: function() {
    this.setData({
      infoCard: false
    })
  },

  // 撤回狗粮
  retractDogFood: function(ev) {
    console.log(ev);
    var that = this;
    var sign = wx.getStorageSync("sign");
    var _did = ev.currentTarget.dataset.did;
    console.log(_did);
    wx.request({
      url:'https://single-dog.playonwechat.com/api/get-back-dog-food?sign='+sign,
      data:{
        did:_did
      },
      success(res){
        var list = that.data.list;
        for (var i = 0; i < list.length; i++) {
          if (list[i].did==_did) {
            list[i].type="1";
          }
        };
        that.setData({
            list:list,

        });
        wx.showToast({
          title: '撤回狗粮成功',
          icon: 'success',
          duration: 1000
        })
      }
    })
  },

  // 预览图片
  prewImg:function(ev){
    var _src = ev.currentTarget.dataset.src;
    console.log(_src);
    wx.previewImage({
      current:_src[0] , // 当前显示图片的http链接
      urls: _src // 需要预览的图片http链接列表
    })
  },

  // 预览二维码
  prewImgCode:function(ev){
    var _src = ev.currentTarget.dataset.qrcode;
    wx.previewImage({
      current:_src[0], // 当前显示图片的http链接
      urls: [_src] // 需要预览的图片http链接列表
    })
  },


// 购买狗粮
  buyDogFood:function(){
    wx.navigateTo({
      url: '../Store/Store'
      })
  },

  onHide: function() {

  },

  onUnload: function() {

  },

  onPullDownRefresh: function() {

  },

  // 页面上拉触底事件的处理函数
  onReachBottom: function(ev) {
    var that = this;
    var sign = wx.getStorageSync("sign");
    var oldPageData = that.data.pageData;
    var page = that.data.page;
      wx.request({
        url:'https://single-dog.playonwechat.com/api/rescue-list?sign='+sign,
        data:{
          page:page
        },
        success(res){
        //  console.log(res);
          var list = res.data.data.rescueList;
          if (list.length>0) {
            list = oldPageData.concat(list);
            page++;
          }else {
            list = oldPageData;
          }
          that.setData({
            list:list,
            page:page
          });
          console.log(that.data);
        }
      })
  },

  // 用户点击右上角分享
  onShareAppMessage: function() {

  }
})
