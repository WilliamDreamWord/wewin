var util = require("../../utils/util.js");
var URL = 'https://dzyh.wewin.com.cn:8028/fams/wewin/loadstocktake';
var listToken = wx.getStorageSync('wxToken');

Page({
  /**
   * 页面的初始数据
   */
  data: {
    src: '',
    totolNum: '',  // 该项易耗品需要盘点的总数
    completedNum: '',  //该项易耗品已经被盘点的总数
    typecode_mean: '',
    createdate: '',
    managementcode_mean: '',
    length: '',

    hideHeader: true,
    hideBottom: true,
    loadMoreData: '加载更多……',
    contentlist: [], // 列表显示的数据源
    allPages: '',    // 总页数
    currentPage: 1,  // 当前页数  默认是1
    refreshTime:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var date = new Date();
    this.setData({
      refreshTime: date.toLocaleDateString()
    })
    this.getData();
  },

  // 上拉加载更多
  loadMore: function() {
    // 如果当前页为最后一页
    var self = this;
    if(self.data.currentPage == self.data.allPages) {
      self.setData({
        loadMoreData: '已经到底啦'
      })
      return;
    }
    setTimeout(function() {
      console.log('上拉加载更多');
      var tempCurrentPage = self.data.currentPage;
      tempCurrentPage = tempCurrentPage+1;
      self.setData({
        currentPage: tempCurrentPage,
        hideBottom: false
      })
      self.getData();
    }, 300);
  },

  // 下拉更新
  refresh: function(e) {
    var self = this;
    setTimeout(function() {
      console.log('下拉更新');
      var date = new Date();
      self.setData({
        currentPage: 1,
        refreshTime: date.toLocaleDateString(),
        hideHeader: false
      })
      self.getData();
    }, 300);
  },

  // 获取数据
  getData: function() {
    var self = this;
    var pageIndex = self.data.currentPage;
    var listToken = wx.getStorageSync('wxToken');
    // console.log("now the token is: " + listToken);

    wx.request({
      url: URL,
      data: {
        token: listToken,
      },
      method: 'GET',
      header: {
        'Content-Type': "json",
      },
      success: function (res) {
        console.log(res);
        var dataModel = res.data;

        if (pageIndex == 1) {
          for (var i=0; i< dataModel.data.length; i++){
            if (dataModel.data[i].status == 2) {
              self.setData({
                src: '../image/uncheck_icon.png'
              })
            } else{
              self.setData({
                src: '../image/check_icon.png'
              })
            }
          }
          // 下拉更新
          self.setData({
            contentlist: dataModel.data,
            allPages: dataModel.totol / 10,
            hideHeader: true
          })
        } else {
          // 加载更多
          console.log('加载更多');
          var tempArray = self.data.data;
          tempArray = tempArray.concat(dataModel.data);
          for (var i=0; i< tempArray.length; i++) {
            if (tempArray[i].status == 2) {
              self.setData({
                src: '../image/uncheck_icon.png',
              })
            } else {
              self.setData({
                src: '../image/check_icon.png',
              })
            }
          }
          self.setData({
            allPages: dataModel.totol / 10,
            contentlist: tempArray,
            hideBottom: true
            // src: '../image/uncheck_icom.png'
          }) 
        }
        
      },
      fail: function (res) {
        console.log(res);
        
      }
    })
  },

  // 跳转至存放地点页
  task_place: function(e) {

    // console.log(e.currentTarget.id);

    wx.navigateTo({
      url: '../task_place/task_place?id=' + e.currentTarget.id,
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