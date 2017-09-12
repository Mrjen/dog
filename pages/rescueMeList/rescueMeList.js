// pages/rescueMeList/rescueMeList.js
Page({
  data: {
     page:2
  },

  onLoad: function (options) {
    console.log(options);
    var that = this;
    var list = [];
    if (options.did) {
      var sign = wx.getStorageSync("sign");
      wx.request({
        url:'https://single-dog.playonwechat.com/api/rescue-dog-detail?sign='+sign,
        data:{
          did:options.did,
          type:1
        },
        success(res){
            console.log("onLoad",res);
            var _dogInfo = res.data.data.dogInfo;
            if (_dogInfo.education=="0") {
              _dogInfo.education = "未知"
            }else if (_dogInfo.education=="1") {
              _dogInfo.education = "幼儿园"
            }else if (_dogInfo.education=="2") {
              _dogInfo.education = "小学"
            }else if (_dogInfo.education=="3") {
              _dogInfo.education = "初中"
            }else if (_dogInfo.education=="4") {
              _dogInfo.education = "初中"
            }else if (_dogInfo.education=="5") {
              _dogInfo.education = "高中"
            }else if (_dogInfo.education=="6") {
              _dogInfo.education = "专科"
            }else if (_dogInfo.education=="7") {
              _dogInfo.education = "本科"
            }else if (_dogInfo.education=="8") {
              _dogInfo.education = "博士"
            }else if (_dogInfo.education=="9") {
              _dogInfo.education = "其他"
            };
            if (_dogInfo.type==1) {
                 //已拒绝
                 that.setData({
                   infoCard:true,
                   hasRecouse:false,
                   dogInfo:true,
                   giveDogInfo:false,
                   hasAgree:false,
                   hasGiveStatus:true,
                   otherRecouse:true
                 })
               }else if (_dogInfo.type==2) {
                 //解救成功
                 that.setData({
                   infoCard:true,
                   hasRecouse:true,
                   dogInfo:true,
                   giveDogInfo:true,
                   hasAgree:true,
                   hasGiveStatus:false,
                   otherRecouse:false
                 })
               }else if (_dogInfo.type==3) {
                 //解救中
                 that.setData({
                   infoCard:true,
                   hasRecouse:true,
                   dogInfo:true,
                   giveDogInfo:true,
                   hasAgree:false,
                   hasGiveStatus:true,
                   otherRecouse:false
                 })
               }
            that.setData({
              dogInfo:_dogInfo
            })
        }
      })
    }
  },

  onReady: function () {

  },

  onShow: function () {
    var that = this;
    var sign = wx.getStorageSync("sign");
    wx.request({
      url:'https://single-dog.playonwechat.com/api/rescue-me-list?sign='+sign,
      success(res){
        console.log(res);
        var list = res.data.data.rescueMeList;
        console.log(list);
        that.setData({
          list:list
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
    console.log(_did);
    var sign = wx.getStorageSync("sign");
    wx.request({
      url:'https://single-dog.playonwechat.com/api/rescue-dog-detail?sign='+sign,
      data:{
        did:_did,
        type:1
      },
      success(res){
        console.log(res);
        var _dogInfo = res.data.data.dogInfo;
        if (_dogInfo.education=="0") {
          _dogInfo.education = "未知"
        }else if (_dogInfo.education=="1") {
          _dogInfo.education = "幼儿园"
        }else if (_dogInfo.education=="2") {
          _dogInfo.education = "小学"
        }else if (_dogInfo.education=="3") {
          _dogInfo.education = "初中"
        }else if (_dogInfo.education=="4") {
          _dogInfo.education = "初中"
        }else if (_dogInfo.education=="5") {
          _dogInfo.education = "高中"
        }else if (_dogInfo.education=="6") {
          _dogInfo.education = "专科"
        }else if (_dogInfo.education=="7") {
          _dogInfo.education = "本科"
        }else if (_dogInfo.education=="8") {
          _dogInfo.education = "博士"
        }else if (_dogInfo.education=="9") {
          _dogInfo.education = "其他"
        }
        that.setData({
           dogInfo:_dogInfo
        });
        console.log(that.data);
      }
    })
    console.log("_type",_type,"_expend",_expend);
    // 判断解救状态
 if (_type==1) {
      //已拒绝
      that.setData({
        infoCard:true,
        expend:_expend,
        hasRecouse:false,
        dogInfo:true,
        giveDogInfo:false,
        hasAgree:false,
        hasGiveStatus:true,
        otherRecouse:true
      })
    }else if (_type==2) {
      //解救成功
      that.setData({
        infoCard:true,
        expend:_expend,
        hasRecouse:true,
        dogInfo:true,
        giveDogInfo:true,
        hasAgree:true,
        hasGiveStatus:false,
        otherRecouse:false
      })
    }else if (_type==3) {
      //解救中
      that.setData({
        infoCard:true,
        expend:_expend,
        hasRecouse:true,
        dogInfo:true,
        giveDogInfo:true,
        hasAgree:false,
        hasGiveStatus:true,
        otherRecouse:false
      })
    }
  },

// 接受狗粮
  acceptFood:function(ev){
    console.log(ev);
     var that = this;
     var did = ev.currentTarget.dataset.did;
     var list = that.data.list;
     var dogInfo = that.data.dogInfo;
     var sign = wx.getStorageSync("sign");
     console.log(dogInfo);
     wx.request({
       url:'https://single-dog.playonwechat.com/api/manage-rescue?sign='+sign,
       data:{
         type:1,
         did:did
       },
       success(res){
         for (var i = 0; i < list.length; i++) {
           if (list[i].did==did) {
              list[i].type = "2"
           }
         };
         that.setData({
           list:list,
           infoCard:true,
           hasRecouse:true,
           giveDogInfo:true,
           hasAgree:true,
           hasGiveStatus:false,
           otherRecouse:false
         });
       }
     })
  },

  // 拒绝狗粮
refuseFood:function(ev){
      console.log(ev);
       var that = this;
       var did = ev.currentTarget.dataset.did;
       var list = that.data.list;
       var dogInfo = that.data.dogInfo;
       var sign = wx.getStorageSync("sign");
       console.log(dogInfo);
       wx.request({
         url:'https://single-dog.playonwechat.com/api/manage-rescue?sign='+sign,
         data:{
           type:0,
           did:did
         },
         success(res){
           for (var i = 0; i < list.length; i++) {
             if (list[i].did==did) {
                list[i].type = "0"
             }
           };
           that.setData({
             list:list,
             infoCard:true,
             hasRecouse:true,
             giveDogInfo:true,
             hasAgree:false,
             hasGiveStatus:false,
             otherRecouse:true
           });
         }
       })
    },

// 关闭信息卡片
closeCard:function(){
   this.setData({
     infoCard:false
   })
},

// 预览二维码
prewImg:function(ev){
  var _src = ev.currentTarget.dataset.src;
  console.log(_src);
  wx.previewImage({
    current:_src[0] , // 当前显示图片的http链接
    urls: _src // 需要预览的图片http链接列表
  })
},

onHide: function () {

},

onUnload: function () {

},

onPullDownRefresh: function () {

},

onReachBottom: function () {
   var that = this;
   var page = that.data.page;
   var oldList = that.data.list;
   wx.request({
     url:'https://single-dog.playonwechat.com/api/rescue-me-list?sign='+sign,
     success(res){
       console.log(res);
       var list = res.data.data.rescueMeList;
       if (list.length>0) {
         list = oldList.concat(list);
         page++;
       } else {
         list = oldList;
       }
       that.setData({
         list:list,
         page:page
       });
     }
   })
},

onShareAppMessage: function () {

}
})
