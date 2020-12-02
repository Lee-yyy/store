// components/vatabs-item/index.js
import {Cart} from "../../models/cart";
import {CartItem} from "../../models/cart-item";
const cart = new Cart()
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
  data: {cartCount:0},

  lifetimes: {
    attached:async function() {
      this.refreshCount()
    },
  },
  pageLifetimes: {
    // 页面被展示
    show:async function(){
      this.refreshCount()
    }
  },
  methods: {
    async refreshCount(){
      const has = await cart.findEqualItem(this.properties.skuItem.id)
      if (has){
        this.setData({
          cartCount:cart.getSkuCountBySkuId(this.properties.skuItem.id)
        })
        return
      }else {
        this.setData({
          cartCount:0
        })
      }

    },
    onDetail() {
      const skuId=this.properties.skuItem.id
      this.triggerEvent('showdetail', {skuId})
    }
  }
})
