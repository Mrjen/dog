// pages/ModifyData/ModifyData.js
Page({
  data: {
    Sex:['男','女'],
    Sexindex:0,
    ageArr: ['22'],
    Ageindex: 0,
    weightArr:['50'],
    weightindex:0,
    heightindex:0,
    Education:['无','幼儿园','小学','初中','高中','专科','本科','硕士','博士','其他'],
    Educationindex:0,
    region: ['北京市', '北京市', '东城区'],
    persionPhoto:false,
    upImg:[],
    photoBoxH:180,
    deletePicture:"https://single-dog.playonwechat.com/static/home/mine_icon_delet.png"
  },

  onLoad: function (options) {
    var that = this;
     console.log(options);
     var photo = options.avatar;
     if (photo) {
       wx.showToast({
          title: '照片上传成功',
          icon: 'success',
          duration: 1500
        })
       that.setData({
         optionsPhoto:photo,
         persionPhoto:false
       })
     };
     console.log("that.data",that.data);
  },

  onReady: function () {

  },

  onShow: function () {
     var that = this;
     var ageArr = [];
     var weightArr = [];
     var bodyHeight = [];
     var minAge = 12; //最小年龄
     var maxAge = 100; //最大年龄
     var minWeight = 30; //最小体重
     var maxWeight = 200; //最大体重
     var minHeight = 80; //最小身高
     var maxHeight = 240; //最大身高
     var avatarUrl = wx.getStorageSync("avatarUrl");
     var nickName = wx.getStorageSync("nickName");
     var sign = wx.getStorageSync("sign");

     for (var i = minAge; i < maxAge; i++) {
       minAge++;
       ageArr.push(minAge);
     };
     for (var i = minWeight; i < maxWeight; i++) {
       minWeight++;
       weightArr.push(minWeight);
     };
     for (var i = minHeight; i < maxHeight; i++) {
       minHeight++;
       bodyHeight.push(minHeight);
     };
     wx.request({
       url:'https://single-dog.playonwechat.com/api/get-userinfo?sign='+sign,
       success(res){
         console.log(res);
         var sex = res.data.data.sex;
         var age = res.data.data.age;
         var Ageindex = ageArr.indexOf(age);
         var weight = res.data.data.weight;
         var height = res.data.data.height;
         var heightindex = bodyHeight.indexOf(height);
         var province = res.data.data.province;
         var education = res.data.data.education;
         var city = res.data.data.city;
         var photo = res.data.data.photo;
         var persionPhoto = that.data.persionPhoto;
         var optionsPhoto = that.data.optionsPhoto;
         var hobby = res.data.data.hobby;
         var Sexindex = new Number();

        //  if (optionsPhoto) {
        //    photo = optionsPhoto;
        //  }else {
        //    photo = res.data.data.photo;
        //  }
         if (sex==1) {
            sex = "男";
            Sexindex = 0;
         }else {
            sex = "女";
            Sexindex = 1;
         };
         console.log(weight,Ageindex);
         if (weight) {
           for (var i = 0; i < weightArr.length; i++) {
             if (weightArr[i]==weight) {
               var weightindex = i;
             }
           }
         }else {
           var weightindex = 0;
         };
         if (height>0) {
           for (var i = 0; i < bodyHeight.length; i++) {
             if (bodyHeight[i]==height) {
               var heightindex = i;
             }
           }
         }else {
           var heightindex = 0;
         }

         var Education = that.data.Education;
         console.log(Education);
         var Educationindex = parseInt(education);
         if (education == "0") {
           education = "未知"
         } else if (education == "1") {
           education = "幼儿园"
         } else if (education == "2") {
           education = "小学"
         } else if (education == "3") {
           education = "初中"
         } else if (education == "4") {
           education = "高中"
         } else if (education == "5") {
           education = "专科"
         } else if (education == "6") {
           education = "本科"
         } else if (education == "7") {
           education = "硕士"
         } else if (education == "8") {
           education = "博士"
         } else if (education == "9") {
           education = "其他"
         };
        that.setData({
          avatarUrl:avatarUrl,
          nickName:nickName,
          ageArr:ageArr,
          sex:sex,
          Sexindex:Sexindex,
          upImg:photo,
          weightArr:weightArr,
          bodyHeight:bodyHeight,
          Ageindex:Ageindex,
          weightindex:weightindex,
          heightindex:heightindex,
          region:[city],
          Educationindex:Educationindex,
          photo:photo,   //已上传的图片
          hobby:hobby
        })
       }
     })

     console.log(that.data);
  },

// 性别
bindSexChange: function(e) {
  console.log('picker发送选择改变，携带值为', e.detail.value);
  this.setData({
    Sexindex: e.detail.value
  })
},

// 年龄
bindAgeChange: function(e) {
  console.log('picker发送选择改变，携带值为', e.detail.value);
  this.setData({
    Ageindex: e.detail.value
  })
},

// 体重
bindWeightChange: function(e) {
  console.log('picker发送选择改变，携带值为', e.detail.value);
  this.setData({
    weightindex: e.detail.value
  })
},

// 身高
bindHeightChange: function(e) {
  console.log('picker发送选择改变，携带值为', e.detail.value);
  this.setData({
    heightindex: e.detail.value
  })
},

// 学历
bindEducationChange: function(e) {
  console.log('picker发送选择改变，携带值为', e.detail.value);
  this.setData({
    Educationindex: e.detail.value
  })
},

// 选择城市
bindRegionChange: function(e) {
  console.log('我选择的地址为', e.detail.value)
  this.setData({
    region: e.detail.value
  });
},

bindTextAreaBlur:function(ev){
  var that = this;
  that.setData({
    hobby:ev.detail.value
  })
},

// 提交信息
submitInfo:function() {
  var that = this;
  wx.showLoading({
    title: '数据提交中',
  })
  var sign = wx.getStorageSync("sign");
  // 性别
  var sex = that.data.sex;
  if (sex=="男") {
    sex = 1;
  }else {
    sex = 2;
  }
  // 年龄
   var ageArr = that.data.ageArr;
   var Ageindex = that.data.Ageindex;

  //体重
  var weightArr = that.data.weightArr;
  var weightindex = that.data.weightindex;
  console.log(weightArr,weightindex);
  //身高
  var bodyHeight = that.data.bodyHeight;
  var heightindex = that.data.heightindex;

  // 学历
  var Education = that.data.Education;
  var Educationindex = that.data.Educationindex;

  // 城市
  var region = that.data.region;
  console.log();
  var city = "";
  var district = "";
  var province = "";
  if (region[1]) {
     city = region[1]
  }else if (region[0]) {
     city = region[0]
  }
  if (region[2]) {
     district = region[2];
  }else {
    district = "未知";
  };
  if (region[0]) {
    province = region[0];
  }else {
    province = "未知";
  }

  // 爱好
  var hobby = that.data.hobby;
      if (!hobby) {
        hobby = " ";
      }

  // 图片
  var photo = that.data.photo;

  var upImg = that.data.imgres;
  console.log(photo,upImg);

      if (!upImg) {
        photo = photo.toString();
      }else {
        photo = photo.concat(upImg);
        photo = photo.toString();
      }
      console.log(photo);

  var info = {
    age:ageArr[Ageindex],
    sex:sex,
    height:bodyHeight[heightindex],
    weight:weightArr[weightindex],
    education:Educationindex,
    hobby:hobby,
    province:region[0],
    city:city,
    district:district,
    photo:photo
  }
  console.log(info);
  wx.request({
    url:'https://single-dog.playonwechat.com/api/update-userinfo?sign='+sign,
    method:"POST",
    data:{
      info:info
    },
    success(res){
      setTimeout(function(){
        wx.hideLoading()
      },0);
      wx.showToast({
        title: '资料保存成功',
        icon: 'success',
        duration: 1000
      });
      setTimeout(function(){
        wx.redirectTo({
          url: '../Mine/Mine'
        })
      },1000)
      console.log(res);
    }
  })
},

// 打开照片弹窗
MyPhoto:function(){
  var that = this;
  that.setData({
    persionPhoto:true
  })
},

// 关闭照片弹窗
closePhoto:function(){
    var that = this;
    that.setData({
      persionPhoto:false
    })
},

// 选择照片
upPhoto:function(){
  wx.chooseImage({
     count: 1, // 默认9
     sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
     sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
     success (res) {
       const src = res.tempFilePaths[0];
       var url = "../ModifyData/ModifyData"
       wx.redirectTo({
         url: `../upload/upload?src=${src}&url=${url}`
       })
     }
   })
},

AddPhoto:function(){
  var that = this;
  var sign = wx.getStorageSync("sign");

  wx.chooseImage({
     count: 9, // 默认9
     sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
     sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
     success (res) {
       var _src = res.tempFilePaths;
       var imgArr = [];
       var count = _src.length;
       var sign = wx.getStorageSync("sign");
       var _upImg = that.data.upImg;
       if (count>0) {
         for (let i = 0; i < _src.length; i++) {
           wx.uploadFile({
              url:'https://single-dog.playonwechat.com/api/upload-picture?sign='+sign+"&type=photo",
              filePath:_src[i],
              name: 'file',
              success: function(res){
                console.log(res);
                var imgres = JSON.parse(res.data);
                console.log(imgres);
                count--;
                imgArr.push(imgres.data);
                that.setData({
                   imgres:imgArr,
                   upImg:_upImg.concat(imgArr)
                })
              }
            })
         };
       }
     }
   })
},

// 删除相册图片
deletePicture:function(ev){
  var that = this;
   var _index = ev.currentTarget.dataset.index;
   var sign = wx.getStorageSync("sign");
   wx.showModal({
      title: '提示',
      content: '确定删除这张照片吗',
      success: function(res) {
        if (res.confirm) {
          wx.request({
             url:'https://single-dog.playonwechat.com/api/delete-photos?sign='+sign,
             data:{
               index:_index
             },
             success(res){
                console.log(res);
                if (res.data.status==1) {
                   var upImg = that.data.upImg;
                   upImg.splice(_index,1);
                  that.setData({
                    upImg:upImg
                  });
                  wx.showToast({
                    title: '删除照片成功',
                    icon: 'success',
                    duration: 1000
                  })
                }
             }
          })
        } else if (res.cancel) {
          console.log('用户点击取消');
        }
      }
    })

},

// 查看图片
prewPicture:function(ev){
  // console.log(ev);
  var that = this;
  var src = ev.currentTarget.dataset.src;
  var upImg = that.data.upImg;
  wx.previewImage({
   current: src, // 当前显示图片的http链接
   urls: upImg // 需要预览的图片http链接列表
  })
},


  onHide: function () {

  },

  onUnload: function () {

  },

  onPullDownRefresh: function () {

  },

  onReachBottom: function () {

  }
})
