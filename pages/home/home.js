// pages/home/home.js

import {Theme} from "../../models/theme";
import {imgsrc} from "../../config/config";
// import {Banner} from "../../models/banner";
import {Category} from "../../models/category.js";
// import {Activity} from "../../models/activity";
// import {SpuPaging} from "../../models/spu-paging";
// import {CouponCenterType} from "../../core/enum";

Page({

  /**
   * 页面的初始数据
   */
  data: {
    themeA: null,
    themeE: null,
    bannerB: null,
    grid: [],
    imgsrc: imgsrc,
    activityD: null,
    spuPaging: null,
    loadingType: 'loading'
  },

  async onLoad(options) {
    this.initAllData()
    // this.initBottomSpuList()
  },

  async initBottomSpuList() {
    const paging = SpuPaging.getLatestPaging()
    this.data.spuPaging = paging
    const data = await paging.getMoreData()
    if (!data) {
      return
    }
    wx.lin.renderWaterFlow(data.items)
  },

  async initAllData() {
    const theme = new Theme()
    await theme.getThemes()

    const themeA = theme.getHomeLocationA()
    console.log(themeA);
    // const themeE = theme.getHomeLocationE()
    // let themeESpu = []

    // if (themeE.online) {
    //   const data = await Theme.getHomeLocationESpu()
    //   if (data) {
    //     themeESpu = data.spu_list.slice(0, 8)
    //   }
    // }

    // const themeF = theme.getHomeLocationF()

    // const bannerB = await Banner.getHomeLocationB()
    const grid = await Category.getHomeLocationC()
    console.log(grid);

    // const activityD = await Activity.getHomeLocationD()

    // const bannerG = await Banner.getHomeLocationG()

    // const themeH = theme.getHomeLocationH()

    this.setData({
      themeA,
      // bannerB,
      grid,
      // activityD,
      // themeE,
      // themeESpu,
      // themeF,
      // bannerG,
      // themeH
    })
  },

  // 跳转优惠券列表
  onGoToCoupons(event) {
    const name = event.currentTarget.dataset.aname
    wx.navigateTo({
      url: `/pages/coupon/coupon?name=${name}&type=${CouponCenterType.ACTIVITY}`
    })
  },
  // 触底获取更多spu数据
  onReachBottom: async function () {
    const data = await this.data.spuPaging.getMoreData()
    if (!data) {
      return
    }
    wx.lin.renderWaterFlow(data.items)
    if (!data.moreData) {
      this.setData({
        loadingType: 'end'
      })
    }
  },

  onPullDownRefresh: function () {

  },


  onShareAppMessage: function () {

  }
})


