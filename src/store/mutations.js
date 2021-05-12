import {ADD_COUNTER, ADD_TO_CART} from './mutation-type'
export default {
  // mutations 唯一的目的是修改state状态
  // mutations中的每一个方法尽可能完成的事件比较单一
    [ADD_COUNTER](state, payload) {
        payload.count++;
    },
    [ADD_TO_CART](state, payload) {
        payload.count = 1
        state.cartlist.push(payload)
    }
}