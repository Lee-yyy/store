import {OrderStatus} from "../core/enum";
import {accSubtract} from "../utils/number";
import {getSlashYMDHMS, toDate} from "../utils/date";
class OrderDetail {
    leftPeriod = 0
    statusText = ''
    discountPrice = 0
    createTime = null
    constructor(orderDetail,period=60) {
        Object.assign(this, orderDetail)
      this.period=period*60
        this.correctOrderStatus()
        this.calDiscountPrice()
        this.createTime = getSlashYMDHMS(orderDetail.create_time)
    }

    orderStatusText(status) {
        switch (status) {
            case OrderStatus.FINISHED:
                return '已完成';
            case OrderStatus.UNPAID:
                return '待支付'
            case OrderStatus.PAID:
                return '待发货'
            case OrderStatus.DELIVERED:
                return '待收货'
            case OrderStatus.CANCELED:
                return '已取消'
        }
    }

    calDiscountPrice() {
        this.discountPrice = accSubtract(this.total_price, this.final_total_price)
    }

    correctOrderStatus() {
      console.log(this.status == OrderStatus.UNPAID)
        if (this.status == OrderStatus.UNPAID) {
            const currentTimestamp = new Date().getTime();
            const createTimestamp = new Date(this.create_time).getTime();
            const periodMill =this.period * 1000;
          console.log(currentTimestamp)
          console.log(createTimestamp)
          console.log(periodMill)
          console.log((createTimestamp + periodMill) - currentTimestamp)
            if ((createTimestamp + periodMill) > currentTimestamp) {
                const mill = (createTimestamp + periodMill) - currentTimestamp
              console.log(mill)
                this.leftPeriod = Math.round(mill / 1000)
              console.log(this.leftPeriod)
            } else {
                this.status = OrderStatus.CANCELED
            }
        }
        this.statusText = this.orderStatusText(this.status)
    }

}

export {
    OrderDetail
}

