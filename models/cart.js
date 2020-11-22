import {Spu} from "./spu";

class Cart {
    static SKU_MIN_COUNT = 1
    static SKU_MAX_COUNT = 77
    static CART_ITEM_MAX_COUNT = 77
    static STORAGE_KEY = 'cart'

    _cartData = null

    //代理模式

    constructor() {
        if (typeof Cart.instance === 'object') {
            return Cart.instance
        }
        Cart.instance = this
        return this
    }

  isEmpty() {
    const cartData = this._getCartData()
    return cartData.items.length === 0;
  }

  /**
   *从本地缓存中获取购物车数据
   *
   * @returns {null|{items: *[]}}
   * @private
   */
  _getCartData() {
    if (this._cartData !== null) {
      return this._cartData
    }
    let cartData = wx.getStorageSync(Cart.STORAGE_KEY);
    if (!cartData) {
      cartData = this._initCartDataStorage()
    }
    this._cartData = cartData
    return cartData
  }

  /**
   * 初始化缓存中的购物车数据
   *
   * @returns {{items: []}}
   * @private
   */
  _initCartDataStorage() {
    const cartData = {
      items: []
    }
    wx.setStorageSync(Cart.STORAGE_KEY, cartData)
    return cartData
  }
}

export {
    Cart
}
