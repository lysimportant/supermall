import {ADD_COUNTER, ADD_TO_CART} from './mutation-type'
export default {
     addCart(context, payload) {
      return new Promise((resolve, reject) => {
          /*   let oldProduct = null
         for(let item of state.cartlist) {
            if(item.iid === payload.iid) {
                oldProduct = item
            }
        } */
        // 查找数组中是否有该商品
        let oldProduct = context.state.cartlist.find(item => item.iid === payload.iid)
        // 2. 判断oldProduct是有值
        if(oldProduct) { // 数量加一
            // oldProduct.count += 1;
            context.commit(ADD_COUNTER, oldProduct)
            resolve("当前的商品数量+1")
        }else { // 添加新的商品到购物车
            // payload.count = 1
            // state.cartlist.push(payload)
            context.commit(ADD_TO_CART, payload)
            resolve("添加了新的商品")
        }
      })
    }
}
