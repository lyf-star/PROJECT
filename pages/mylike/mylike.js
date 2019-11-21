
Page({
  /**
   * 页面的初始数据
   */
  data: {
    specId: '',
    good: [],
    savegood: [],
  },

  onLoad: function (options) {
    console.log(wx.getStorageSync('goodData'));
    let savegood = wx.getStorageSync('goodData')//获得缓存
    let index = savegood.length - 1;
    console.log(savegood[index].id);
    let goodid = savegood[index].id
    let temp = savegood[goodid] //将获得缓存后匹配的数据放入新的数组
    let goodtemp = this.data.good;
    goodtemp.push(temp);
    this.setData({
      specId: goodid,
      good: goodtemp,
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})