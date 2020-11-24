import {Http} from "../utils/http";

class Spu {

    static getDetail(id) {
        return Http.request({
            url: `sku/detail/${id}`
        });
    }

}

export {
    Spu
}
