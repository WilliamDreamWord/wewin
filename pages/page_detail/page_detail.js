var detailToken = wx.getStorageSync('wxToken');

Page({

  /**
   * 页面的初始数据
   */
  data: {

    docuNum: '',  // 单据编号
    wareHouse: '',  //盘点仓库
    createdDate: '',  // 创建时间
    matName: '',  //物料名称
    matNum: '',  // 物料编号
    matModel: '',  //物料型号
    bookNum: '',  // 账面数量
    countNum: ''  // 盘点数量
  },

  // 返回上一页
  back: function() {
    wx.navigateBack({
      delta: 1,  
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var detail_id = options.id;

    wx.request({
      // 根据用户点击的易耗品列表项获得的id来查询易耗品详情页
      url: '',
      data: {
        token: detailToken,
        detail_id: detail_id
      },
      method: 'GET',
      header: {
        'Content-type' : 'json'
      },
      success: function(res) {
        console.log(res);
        var dataModel = res.data;
        this.setData({
          docuNum: dataModel.docuNum,
          wareHouse: dataModel.wareHouse,
          createdDate: dataModel.createdDate,
          matName: dataModel.matName,
          matNum: dataModel.matNum,
          matModel: dataModel.matModel,
          bookNum: dataModel.bookNum,
          countNum: dataModel.countNum
        })
      }
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