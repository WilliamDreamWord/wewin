//pages/login/login.js
var util = require("../../utils/util.js")
var app = getApp();
var URL = 'https://dzyh.wewin.com.cn:8028/fams/login/applogin';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userName: '',
    userPassword: '',
    showTopTips: false,
    errorMsg: ""
  },

  formSubmit: function(e) {
    console.log(e.detail.value); //格式 object {userName: "user", userPassword: "password"}
    var that = this;

    //获得表单数据
    var userName = e.detail.value.userName;
    var userPassword = e.detail.value.userPassword;

    //后台交互登录测试

    //判断账号是否为空
    if ("" == util.trim(userName) && "" != util.trim(userPassword)) {
      util.tipError("账号不能为空", that);
      setTimeout(function() {
        util.clearError(that);
      }, 2000)
      // console.log(userName)
      return;

    } else if ("" == util.trim(userPassword) && "" != util.trim(userName)) {
      //判断密码是否为空
      util.tipError("密码不能为空", that);
      setTimeout(function () {
        util.clearError(that);
      }, 2000)
      return;

    } else if ("" == util.trim(userName) && "" == util.trim(userPassword)) {
      //账号和密码同时为空
      util.tipError("账号和密码都不能为空", that);
      setTimeout(function () {
        util.clearError(that);
      }, 2000)
      return;

    } else if ("" != util.trim(userName) && "" != util.trim(userPassword)) { //账号和密码不为空，且账号为admin，密码为123456
      util.clearError(that);

      wx.request({
        url: URL,
        data: {
          user_name: util.trim(userName),
          user_pass: util.trim(userPassword)
        },
        method: 'GET',
        header: {
          'Content-Type': "json",
        },
        success: function(res) {
          console.log(res.data);
          if (res.data.success) {
            wx.setStorageSync('userName', userName);
            wx.setStorageSync('userPassword', userPassword);
            wx.setStorageSync('wxToken', res.data.token);

            //跳转至主界面
            wx.navigateTo({
              url: '../main/main',
            })
          } else {
            util.tipError("用户名或密码错误！", that);
            setTimeout(function () {
              util.clearError(that);
            }, 2000)
          }
          return;
        },
        fail: function(res) {
          util.tipError("请求服务器失败，请稍后重试", that);
          setTimeout(function () {
            util.clearError(that);
          }, 2000)
          console.log(".....请求失败 request failed.....");
        }
      })

    } else {
      util.tipError("账户或密码错误", that);
      setTimeout(function () {
        util.clearError(that);
      }, 2000)
      return;
    }
  },

  /**
   * 生命周期函数--监听页面加载
   * 加载完，处理事件
   * 如果有本地缓存数据则直接显示
   */
  onLoad: function(options) {
    //获取本地存储的数据
    var userName = wx.getStorageSync('userName');
    var userPassword = wx.getStorageSync('userPassword');

    // console.log(userName);
    // console.log(userPassword);

    if (userName) {
      this.setData({
        userName: userName
      });
    }
    if (userPassword) {
      this.setData({
        userPassword: userPassword
      });
    }
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