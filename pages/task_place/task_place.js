var placeToken = wx.getStorageSync('wxToken');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    contentlist: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.id);
    var place_id = options.id;

    wx.request({
      // 根据用户点击盘点任务产生的id来查询该易耗品存放的场所区域
      url: '',
      data: {
        token: placeToken,
        place_id: place_id
      },
      method: 'GET',
      header: {
        'Content-type' : 'json'
      },
      success: function(res) {
        console.log(res);
        var dataModel = res.data;

        this.setData({
          contentlist: dataModel.data,
        })
      }
    })
  },

  storage_place: function(e) {
    wx.navigateTo({
      url: '../storage_place/storage_place?id=' + e.currentTarget.id,
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