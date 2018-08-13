var resource=require("../../utils/inquery.js");
var util = require("../../utils/util.js");
var URL = 'https://dzyh.wewin.com.cn:8028/fams/code/loadDictListApp'; // 查询部门， 类别， 现状态的的后台接口
var URL1 = 'https://dzyh.wewin.com.cn:8028/fams/wewin/loadasset';  // 根据用户的条件来查询易耗品
var res_status = new Array();  // 后台查询现状态的返回值
var res_type = new Array();  // 后台查询类别的返回值
var inquiryToken = wx.getStorageSync('wxToken');  // 缓存中的token值

var res_region_text = new Array();  // 后台查询部门的返回值
var res_region = {};  // 部门中的集合参数
var first_region;  // 部门中的首选项 eg：廊坊分公司

var rate = 1; // 点击查询按钮的次数,起始为1：便于集合循环加入value
var para = new Array();  // 用户存放每次点击按钮时的条件数组
var quiry_para = {};  // 点击查询时所记录的查询条件，以rate自增为key，其余条件为数组value

Page({
  data: {

    // header和bottom开始不显示
    hideHeader: true,
    hideBottom: true,

    refreshTime: '', // 刷新的时间 
    contentlist: [], // 列表显示的数据源
    allPages: '',    // 总页数
    currentPage: 1,  // 当前页数  默认是1
    loadMoreData: '加载更多……',

    // input输入框输入的易耗品名称
    getName: '',

    // input输入框输入的品牌规格型号
    getModel: '',

    // 易耗品列表名
    title:'',
    
    //筛选栏头部三个选项开关
    opennav0:true,
    opennav1:false,
    opennav2:false,
    opennav3:false,

    //顶部所显示区县/部门
    department_nav:"部门",

    //用户所选择的部门
    user_dep:"",

    //区县/部门
    region: {},

    //展示用户选的区县的部门
    department: {},

    //所有类型展示
    type_all: [],

    // 所有状态展示
    status_all: [],

    //已经选择的类型
    t_type:"类型",

    // 已经选好的易耗品状态
    t_status: "状态"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    // var inquiryToken = wx.getStorageSync('wxToken');
    // console.log("item_inquiry' token is: " + inquiryToken);

    var date = new Date();
    that.setData({
      refreshTime: date.toLocaleDateString(),
    })

    that.getData();

    // 接口取status状态值
    wx.request({

      url: URL,
      data: {
        token: inquiryToken,
        tablename: 'd_assetstatus',
      },
      method: 'GET',
      header: {
        'Content-Type': "json",
      },
      success: function (res) {

        console.log(res);
        for (var i = 0; i < res.data.data.length; i++) {
          res_status[i] = res.data.data[i].text;
          // console.log(res_status[i]);
        }

        // console.log(res_status);
        that.setData({
          status_all: res_status
        })
        
      },
      fail: function (res) {
        console.log(res);
      },
    }),

    // 接口取type类型值
    wx.request({
      
      url: URL,
      data: {
        token: inquiryToken,
        tablename: 'd_assettype'
      },
      method: 'GET',
      header: {
        'Content-Type': "json",
      },
      success: function(res) {
        // console.log(res);

        for (var i=0; i<res.data.data.length; i++){
          res_type[i] = res.data.data[i].text;
        }

        that.setData({
          type_all: res_type,
        })
      },
      fail: function(res) {
        console.log(res);
      }
    }),

    // 获取region机构值
    wx.request({
      url: URL,
      data: {
        token: inquiryToken,
        tablename: 'd_organization'
      },
      method: 'GET',
      header: {
        'Content-Type': "json",
      },
      success: function(res) {
        // console.log(res);

        first_region = res.data.data[0].text;
        
        // console.log(first_region);

        for (var i=0; i< res.data.data.length-1; i++){
          res_region_text[i] = res.data.data[i+1].text;
        }

        res_region[first_region] = res_region_text;

        that.setData({
          region: res_region,
        })
      }, 
      fail: function(res) {
        console.log(res);
      }
    })
  },

  // 上拉加载更多
  loadMore: function() {
    var self = this;
    // 当前是最后一页
    if (self.data.currentPage == self.data.allPages) {
      self.setData({
        loadMoreData: '已经到底啦',

      })
      return;
    }
    setTimeout(function() {
      console.log('上拉加载更多');
      var tempCurrentPage = self.data.currentPage;
      tempCurrentPage++;
      self.setData({
        currentPage: tempCurrentPage,
        hideBottom: false,
      })
      self.getData();
    }, 300);
  },

  // 下拉刷新
  refresh: function(e) {
    var self = this;
    setTimeout(function() {
      console.log('下拉刷新');
      var date = new Date();
      self.setData({
        currentPage: 1,
        refreshTime: date.toLocaleDateString(),
        hidenHeader: false
      })
      self.getData();
    }, 300);
  },

  // 统一访问后台接口，根据条件参数获取数据 pageindex：页码参数
  getData: function() {

    var user_dep_str = wx.getStorageSync('user_dep');
    var t_type_str = wx.getStorageSync('t_type');
    var t_status_str = wx.getStorageSync('t_status');
    var t_name_str = wx.getStorageSync('t_name');
    var t_model_str = wx.getStorageSync('t_model');

    console.log("parameters are " + user_dep_str + t_type_str + t_status_str + t_name_str + t_model_str);

    var self = this;
    var pageIndex = self.data.currentPage;
    wx.request({
      url: URL1,
      data: {
        token: inquiryToken,
        limit: 10,
        page: 1
      },
      method: 'GET',
      header: {
        'Content-Type': "json",
      },
      success: function(res) {
        console.log(res);
        var dataModel = res.data;
        if (pageIndex == 1) {
          // 下拉刷新
          self.setData({
            allPages: dataModel.totol / 10,
            contentlist: dataModel.data,
            hideHeader: true
          })
        } else {
          // 上拉加载更多
          var tempArray = self.data.contentlist;
          tempArray = tempArray.concat(dataModel.data);
          self.setData({
            allPages: dataModel.totol / 10,
            contentlist: tempArray,
            hideBottom: true
          })
        }
      },
       fail: function(res) {
         console.log(res);
       }
    })
  },

  // 点击之后的事件携带值
  bindPickerChange: function (e) {
    // console.log("picker发送选择改变，携带值为" +  e.detail.value);
    this.setData({
      index: e.detail.value
    })
  },

  // 点击返回上一页
  back: function() {
    wx.navigateBack({
      delta: 1,
    })
  },

  // 扫描方法 获取到列表id后跳转到详情页
  scan: function() {
    var that = this;

    wx.scanCode({
      success: (res) => {
        console.log(res);

        if (res.result != "") {

          // 根据扫描到的列表id后台查询是否存在
          wx.request({
            url: '',
            data: {
              token: inquiryToken,
              id: res.result
            },
            method: 'GET',
            header: {
              'Content-Type': "json",
            },
            success: function(res) {
              console.log(res);
              if(res.data) {
                setTimeout(function(){
                  wx.navigateTo({
                    url: '../page_detail/page_detail',
                  })
                }, 2000);
                wx.showToast({
                  title: '扫描成功',
                  icon: 'success',
                  duration: 2000
                })
              } else {
                wx.showToast({
                  title: '扫描失败,无该列表项',
                  icon: 'none',
                  duration: 2000
                })
              }
            }
          })
        } else {
          wx.showToast({
            title: '无法获取列表项',
            icon: 'none',
            image: '',
            duration: 2000
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

  //点击导航栏 部门 触发函数
  list_department:function(e){
    if(this.data.opennav1){
      this.setData({
        opennav1:false,
        opennav0:true
      });
    }else{
      this.setData({
        opennav0: false,
        opennav1: true,
        opennav2: false ,
        opennav3: false
      });
    }
    // console.log("nav1:"+this.data.opennav1);
  },

  //选择 区县 函数
  select_reg:function(e){
    this.setData({
      department:this.data.region[e.currentTarget.dataset.reg]
    });
    // console.log(this.data.department);
  },
  
  //选择 部门 函数
  select_dep:function(e){

    this.setData({
      user_dep: e.currentTarget.dataset.dep
    });

    wx.setStorageSync('user_dep', this.data.user_dep);

    // console.log(this.data.user_dep);
  },

  //点击导航栏 类别 触发函数
  list_typename: function (e) {
    if (this.data.opennav2) {
      this.setData({
        opennav0: true,
        opennav2: false
      });
    } else {
      this.setData({
        opennav0: false,
        opennav2: true,
        opennav1: false,
        opennav3: false
      });
    }
    // console.log("nav2:"+this.data.opennav2);
  },

  //用户选择具体 类别 触发函数
  select_type:function(e){
    this.setData({
      t_type:e.currentTarget.dataset.sltype
    });

    wx.setStorageSync('t_type', this.data.t_type);

    // console.log(this.data.t_type);
  },

  // 用户点击导航栏 现状态 触发函数
  list_status: function (e) {
    if (this.data.opennav3) {
      this.setData({
        opennav0: true,
        opennav3: false
      });
    } else {
      this.setData({
        opennav0: false,
        opennav3: true,
        opennav1: false,
        opennav2: false
      });
    }
    // console.log("nav3:" + this.data.opennav3);
  },

  //用户选择具体 状态 触发函数
  select_status: function (e) {
    this.setData({
      t_status: e.currentTarget.dataset.sltype
    });

    wx.setStorageSync('t_status', this.data.t_status);

    // console.log(this.data.t_status);
  },

  // 获取用户input输入框输入的易耗品名称内容
  getName: function(e) {
    this.setData({
      getName: e.detail.value
    })
  },

  getModel: function(e) {
    this.setData({
      getModel: e.detail.value
    })
  },

  // 点击查询按钮的接口方法
  search: function(e) {
    var self = this;
    
    var t_name = this.data.getName;
    var t_model = this.data.getModel;

    wx.setStorageSync('t_name', this.data.getName);
    wx.setStorageSync('t_model', this.data.getModel);

    self.getData();

  },

  check: function(e) {
    wx.navigateTo({
      url: '../page_detail/page_detail?id=' + e.currentTarget.id,
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
