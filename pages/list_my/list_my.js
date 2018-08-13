var myToken = wx.getStorageSync('wxToken');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    department: "",  // 部门
    account: ""  //账户
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.request({
      // 查询用户信息
      url: '',
      data: {
        token: myToken
      },
      method: 'GET',
      header: {
        'Content-type' : 'json'
      },
      success: function(res) {
        console.log(res);

        var dataModel = res.data;

        this.setData({
          department: dataModel.data.department,
          account: dataModel.data.account
        })
      }
    })
  },
  back: function() {
    wx.navigateBack({
      delta: 1
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