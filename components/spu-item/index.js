// components/vatabs-item/index.js
import {Cart} from "../../models/cart";
import {CartItem} from "../../models/cart-item";
Component({
  /**
   * 组件的属性列表
   */
  properties: {

    skuItem: Object,
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    onDetail(){
      console.log("onDetailonDetailonDetailonDetail")
    },
    // onAddToCart(event){
    //   console.log(event)
    //   const chosenSku = this.properties.skuItem
    //   const cart = new Cart()
    //   let skuCount = cart.getCartItemCount()
    //   // if(!skuCount){
    //   //   skuCount=0
    //   // }
    //   console.log("onAddToCart")
    //   const cartItem = new CartItem(chosenSku, skuCount)
    //   cart.addItem(cartItem)
    //   this.updateCartItemCount()
    // },
    //
    // updateCartItemCount() {
    //   const cart = new Cart()
    //   this.setData({
    //     cartItemCount: cart.getCartItemCount(),
    //     showRealm: false
    //   })
    // },
  }
})
