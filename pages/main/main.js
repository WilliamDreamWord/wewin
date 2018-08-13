// pages/success/success.js
var mainToken = wx.getStorageSync('wxToken');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    totalNum: '', // 总数量
    useNum: '',  // 使用中数量
    freeNum: '',  // 空闲品数量
    newNum: ''  // 本月新增数量
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    wx.request({
      // 易耗品概况查询
      url: '',
      data: {
        token: mainToken,
      },
      method: 'GET',
      header: {
        'Content-type' : 'json'
      },
      success: function(res) {
        console.log(res);

        var dataModel = res.data;
        this.setData({
          totalNum: dataModel.data.totalNum,
          useNum: dataModel.data.useNum,
          freeNum: dataModel.data.freeNum,
          newNum: dataModel.data.newNum
        })
      }
    })
  },

  // 查询方法
  Inquire: function() {
    wx.navigateTo({
      url: '../item_inquiry/item_inquiry',
    })
  },

  // 盘点方法
  Inventory: function() {
    wx.navigateTo({
      url: '../task_list/task_list',
    })
  },

  // 我的方法
  Myself: function() {
    wx.navigateTo({
      url: '../list_my/list_my',
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
    //显示顶部刷新图标
    wx.showNavigationBarLoading();
    //隐藏顶部刷新图标
    wx.hideNavigationBarLoading();
    //停止下拉更新动作
    wx.stopPullDownRefresh();
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