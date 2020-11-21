import {mainColor} from "../../config/config"
import {Category} from "../../models/category.js";
Page({
  data: {
    vtabs: [],
    activeTab: 0,
    mainColor:mainColor

  },

  onLoad() {
  this.initAllData()
  },

  async initAllData() {

    const vtabs = await Category.getAllCategory()
    console.log(vtabs)
    this.setData({vtabs})
  },

  onTabCLick(e) {
    const index = e.detail.index
    console.log('tabClick', index)
  },

  onChange(e) {
    const index = e.detail.index
    console.log('change', index)
  }

})
