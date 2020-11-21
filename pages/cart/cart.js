// pages/cart/cart.js
import {Cart} from "../../models/cart";

const cart = new Cart()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cartItems: [],
    isEmpty: true,
    allChecked: false,
    totalPrice: 0,
    totalSpuCount: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  async onLoad(options) {
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  },

})
