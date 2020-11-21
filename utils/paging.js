import {Http} from "./http";
// 瀑布流分页获取数据
class Paging {

  start
  limit
  req
  locker = false
  url
  moreData = true
  accumulator = []


  constructor(req, limit = 10, start = 0) {
    this.start = start
    this.limit = limit
    this.req = req
    this.url = req.url
  }

  async getMoreData() {
    if(!this.moreData){
      return
    }
    if(!this._getLocker()){
      return
    }
    // 只在有更多数据并锁开着情况下获取数据
    const data =await this._actualGetData()
    this._releaseLocker()
    return data
  }

  // 获取数据
  async _actualGetData() {
    const req = this._getCurrentReq()
    let paging = await Http.request(req)
    if(!paging){
      return null
    }
    if(paging.total === 0){
      return {
        empty:true,
        items:[],
        moreData:false,
        accumulator:[]
      }
    }
    // 将总页数与当前页数比较确定是否还有更多数据
    // 若还有数据则累加start以便下次请求使用
    this.moreData = Paging._moreData(paging.total_page, paging.page)
    if(this.moreData){
      this.start += this.limit
    }
    this._accumulate(paging.items)
    console.log(this.accumulator)
    return {
      empty:false,
      items: paging.items,
      moreData:this.moreData,
      accumulator:this.accumulator
    }
  }
  // 累积的所有spu
  _accumulate(items){
    this.accumulator = this.accumulator.concat(items)
  }
  // 是否还有更多数据
  static _moreData(totalPage, pageNum) {
    return pageNum < totalPage-1
  }
  // 拼接获取更多数据的url 获取从start起count位数据
  _getCurrentReq() {
    let url = this.url
    const params = `start=${this.start}&limit=${this.limit}`
    if(url.includes('?')){
      url += '&' + params
      // contains
    }
    else{
      url += '?' + params
    }
    this.req.url  = url
    return this.req
  }
  // 关锁
  _getLocker() {
    if (this.locker) {
      return false
    }
    this.locker = true
    return true
  }
  // 开锁
  _releaseLocker() {
    this.locker = false
  }

}

export {
  Paging
}
