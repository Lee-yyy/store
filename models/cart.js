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
}

export {
    Cart
}
