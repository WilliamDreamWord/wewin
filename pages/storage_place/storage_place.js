var util = require("../../utils/util.js");
var storToken = wx.getStorageSync('wxToken');
var res_id = new Array();  // 记录onload中易耗品的列表项id数组
var dataModel = {}; // 记录onload中易耗品的列表项集合
var taskNum;  // 易耗品总数
var taskedNum; // 已盘点易耗品总数

Page({

  /**
   * 页面的初始数据
   */
  data: {
    storagePlace: '',  //存放点名称
    taskNum: '',  // 该存放点盘点总数
    taskedNum: '',  // 该存放点已经盘点的总数
    statusText: '',  
    contentlist: {},
    color: ''
  },

  // 扫描接口 扫描到列表项则将状态改变为已盘点
  scan: function(e) {
    var that = this;
    wx.scanCode({
      success: (res) => {
        cosnole.log(res);

        if (res.result == "") {
          wx.showToast({
            title: '无法获取易耗品信息',
            icon: 'none',
            duration: 2000
          })
        } else {
          wx.request({
            // 根据扫描出来的id查询接口url
            url: '',  
            data: {
              token: storToken,
              id: res.result
            },
            method: 'GET',
            header: {
              'Content-Type': "json",
            },
            success: function (response) {
              wx.showLoading({
                title: '盘点中'
              })
            
              if (response.data.msg == "未盘点") {
                // 扫描成功：扫描出的id存在，且未盘点
                wx.showToast({
                  title: '扫描成功',
                  icon: 'success',
                  duration: 2000
                })

                for(var j=0; j< res_id.length; j++) {
                  if(res.result == res_id[i]) {
                    taskedNum++;  // 已盘点数加一
                    that.setData({
                      contentlist: dataModel,
                      statusText: '已盘点',
                      colro: rgb(136, 136, 136),
                      taskedNum: taskedNum
                    })
                    
                  } else {
                    that.setData({
                      contentlist: dataModel,
                      statuslist: '盘点',
                      color: rgb(65, 165, 230)
                    })
                  }
                }

              } else if (response.data.msg == "已盘点"){
                wx.showToast({
                  title: '已盘点',
                  icon: 'none',
                  duration: 2000,
                })
              } else {
                wx.showToast({
                  title: '扫描失败',
                  icon: 'none',
                  duration: 2000
                })
              }

              setTimeout(function () {
                wx.hideLoading()
              }, 2000);

            },
            fail: function (response) {
              console.log(res);
            }
          })
        }

      },
      fail: (res) => {
        console.log(res);

        util.tipError("扫描出错，请稍后再试", that);
        setTimeout(function() {
          util.clearError(that);
        }, 2000);
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(options.id);
    var stor_id = options.id;

    this.setData({
      // stor_id是存放地点的id
      storagePlace: stor_id,
    })

    // 根据用户点击盘点场所记录的地点id来查询该存放点的易耗品列表
    wx.request({
      url: '',
      data: {
        token: storToken,
        stor_id: stor_id
      },
      method: 'GET',
      header: {
        'conTent-Type' : 'json'
      },
      success: function(res) {
        console.log(res);

        taskedNum = 0;

        dataModel = res.data;

        for(var i =0; i< res.data.length; i++) {
          res_id[i] = res.data.data[i].list_id;
          if (res.data.data[i].status) {
            // 判断易耗品是否已被盘点
            this.setData({
              contentlist: dataModel.data,
              statusText: '已盘点',
              color: rgb(136, 136, 136)
            })
            taskedNum++;  // 页面加载中检测传回的res里面有多少个已被盘点
          } else {
            this.setData({
              contentlist: dataModel.data,
              statusText: '盘点',
              color: rgb(65, 165, 230)
            })
          }
        }
        console.log(taskedNum);
        this.setData({
          taskNum: res.data.data.length,
          taskedNum: taskedNum
        })

      },
      fail: function(res) {
        console.log(res);
      }  
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})