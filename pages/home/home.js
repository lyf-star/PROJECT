
Page({
  data: {
    routers: [
    {
      text: '体育场地',
      icon: '../images/sports.png',
      code: '9'
    },
    {
      text: '活动场地',
      icon: '../images/activity.png',
      code: '10'
    },
    {
      text: '用品或物资',
      icon: '../images/物资.png',
      code: '11'
    }
  ],
  goods:[
    {
      specId:'0',
      name:'南区羽毛球场',
      image:'../images/4.jpg',
      spot:'华南师范大学南区体育馆'
    },
    {
      specId: '1',
      name: '桃李厅',
      image: '../images/5.jpg',
      spot: '华南师范大学南桃李园'
    },
    {
      specId: '2',
      name: '帐篷',
      image: '../images/6.jpg',
      spot: '华南师范大学校学生会'
    }
  ]
  },
  onLoad: function (){
    console.log('onLoad')
    var that = this
  },
  sousuo: function (e) {
    wx.navigateTo({
      url: '../search/search',
    })
  },
})