Page({
  data: {
    tips: '',
    curId: '',
    detailData: [
      {
        name: '南区羽毛球场',
        image: '../images/4.jpg',
        spot: '华南师范大学南区体育馆',
        goodsCallyList:[
          '../images/41.jpg',
          '../images/42.jpg',
          '../images/43.jpg'
        ]
      },
      {
        name: '桃李厅',
        image: '../images/5.jpg',
        spot: '华南师范大学南桃李园',
        goodsCallyList: [
          '../images/51.jpg',
          '../images/52.jpg',
          '../images/53.jpg'
        ]
      },
      {
        name: '帐篷',
        image: '../images/6.jpg',
        spot: '华南师范大学校学生会',
        goodsCallyList: [
          '../images/61.jpg',
          '../images/62.jpg',
          '../images/63.jpg'
        ]
      }
    ],
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000,

    goodList: [],
    isClick: true,
    goodid: ''
  },

  buyNow: function (event) {  //获取cartId
    //判断是否登陆,如果未登陆跳到登陆界面，如果登陆就调接口，跳转确认订单界面
    var CuserInfo = wx.getStorageSync('CuserInfo');
    console.log(CuserInfo.token)
    if (!CuserInfo.token) {
      //跳转到login
      wx.navigateTo({
        url: '../../login/login?goodsId=' + goodsId + '&specId=' + specId,
      })
    } else {
      var that = this;
      request.req(uribuy, {
        specId: specId,
        count: '1',
        saveType: '1',
        goodsId: goodsId
      }, (err, res) => {
        var result = res.data;
        console.log(result);
        if (result.result == 1) { //获取cartId
          //拿着cartId跳转到确认订单界面
          wx.navigateTo({   //获取cartId
            url: '../../orderConfirm/orderConfirm?cartIds=' + result.data[0].cartIds,
          })
        } else {
          that.setData({
            tips: res.data.msg
          })
          console.log(res.data.msg)
        }
      })
    }
  },

  onLoad: function (options) {
    // 生命周期函数--监听页面加载

    this.setData({
      curId: options.specId,
    })
  },
  //数据请求

  shoucang(e) {
    if (!this.data.isClick == true) {
      let goodData = this.data.detailData;
      goodData.push({
        goodid: goodData.length,
        id: this.data.curId
      })
      wx.setStorageSync('goodData', goodData);//设置缓存
      this.data.goodList = this.data.detailData;
      wx.showToast({
        title: '已收藏',
      });
    } else {
      wx.showToast({
        title: '已取消收藏',
      });
    }

    this.setData({
      isClick: !this.data.isClick
    })
  }
})