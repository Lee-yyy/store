import {Cart} from "../../models/cart";
import {CartItem} from "../../models/cart-item";
const cart = new Cart()
Component({
    properties: {
        data: Object
    },

    data: {
        tags: Array,
        cartCount:0
    },

    observers: {
        data: function (data) {
            if (!data) {
                return
            }
            if (!data.tags) {
                return
            }
            const tags = data.tags.split('$')
            this.setData({
                tags
            })
        }
    },
    lifetimes: {
        attached:async function() {
          this.refreshCount()
        },
      },
      pageLifetimes: {
        // 页面被展示
        show:async function(){
          // console.log("aaaaaaaaaaaa")
          this.refreshCount()
        }
      },
    methods: {
        async refreshCount(){
          const has = await cart.findEqualItem(this.properties.data.id)
          if (has){
            this.setData({
              cartCount:cart.getSkuCountBySkuId(this.properties.data.id)
            })
            return
          }else {
            this.setData({
              cartCount:0
            })
          }
        },
        onImgLoad(event) {
            const {width, height} = event.detail
            this.setData({
                w:340,
                h:340*height/width
            })
        },
        onItemTap(event){
            const pid = event.currentTarget.dataset.pid
            wx.navigateTo({
                url:`/pages/detail/detail?pid=${pid}`
            })
        }
    }
})
