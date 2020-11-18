import {config} from "../config/config";
import {promisic} from "./util";


class Http {
  static async request({
                         url,
                         data,
                         method = 'GET',
                       }) {
    let res;
    res = await promisic(wx.request)({
      url: `${config.apiBaseUrl}${url}`,
      data,
      method,
      header: {
        'content-type': 'application/json',
        appkey: config.appkey,
        'authorization': `Bearer ${wx.getStorageSync('token')}`
      }
    })
    return res.data
  }
}


export {
  Http
}
