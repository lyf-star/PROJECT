var app = getApp();
var searchValue = ''

Page({
  data: {
    searchStorage:[],    //搜索记录缓存列表
    centent_Show: true,
    searchValue: '',    //输入值
    StorageFlag:false,
    goods:[]    //搜索结果存放
  },

  searchValueInput: function (e) {
    var value = e.detail.value;
    this.setData({
      searchValue: value,
    });
    if (!value && this.data.productData.length == 0) {
      this.setData({
        centent_Show: false,
      });
    }
  },

  //点击缓存搜索列表
  tapSercherStorage: function (e) {
    var that = this;
    var index = parseInt(e.currentTarget.id);
    for (var j = 0; j < that.data.searchStorage.length; j++) {
      if (j == index) {
        //将所选的搜索历史加到搜素框
        this.setData({
          searchValue: that.data.searchStorage[j].name,
          StorageFlag: false,
        })
      }
    }
  },  

  sousuo: function (e) {
    var id = e.currentTarget.dataset.id
    var program_id = app.program_id;
    var that = this;

    if (that.data.searchValue.length == 0) {
      return;
    }
    //控制搜索历史
    var self = this;
    if (this.data.searchValue != '') {
      //将搜索记录更新到缓存
      var flag=true;
      for (var j = 0; j < that.data.searchStorage.length; j++) {
        if (that.data.searchStorage[j].name == this.data.searchValue) {
          flag = false;
          break;
        }
      }
      if(flag == true){
        var searchData = self.data.searchStorage;
        searchData.push({
          id: searchData.length,
          name: self.data.searchValue
        })
        wx.setStorageSync('searchData', searchData);
        self.setData({ StorageFlag: false, })
      }
    }

    wx.request({
      url: 'xxx.php',//这里填写后台给你的搜索接口
      method: 'post',
      data: { str: that.data.searchValue, program_id: program_id, style: id },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        if (res.data.length == 0) {
          that.setData({
            centent_Show: false,
          });
        }
        that.setData({
          goods: res.data,
        });
      },
      fail: function (e) {
        wx.showToast({
          title: '网络异常！',
          duration: 2000
        });
      },
    })
  },
      
  //清除缓存历史
  clearSearchStorage: function () {
    wx.removeStorageSync('searchData')
      this.setData({
        searchStorage: [],
        StorageFlag: false,
      })
  },
      //打开历史记录列表
  openLocationsercher: function () {
    this.setData({
        searchStorage: wx.getStorageSync('searchData') || [],
        StorageFlag: true,
        listFlag: true,
      })
  },

  onLoad: function (options) {
    this.openLocationsercher();
  },

})