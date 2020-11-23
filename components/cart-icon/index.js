import {Cart} from "../../models/cart";
import {CartItem} from "../../models/cart-item";
import {Locker} from "../../models/locker"


let locker = new Locker()
Component({
  properties: {

    skuItem: Object,
  },
  data: {
  },
  methods: {
    onAddToCart(event){
      console.log(event)
      if(!locker.getLocker()){
        return
      }
      const chosenSku = this.properties.skuItem
      const cart = new Cart()
      let skuCount = cart.getCartItemCount()
      // if(!skuCount){
      //   skuCount=0
      // }
      console.log("onAddToCart")
      const cartItem = new CartItem(chosenSku, skuCount)
      cart.addItem(cartItem)
      this.updateCartItemCount()
      locker.releaseLocker()
    },

    updateCartItemCount() {
      const cart = new Cart()
      this.setData({
        cartItemCount: cart.getCartItemCount(),
        showRealm: false
      })
    },}
});
