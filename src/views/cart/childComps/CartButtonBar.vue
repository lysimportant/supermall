<template>
  <div class="button-bar">
    <div class="check-content">
      <cart-check-button  class="check-button"
                          :is-checked="isSelectAll"
                          @click.native="buttonChange"/>
      <span>全选</span>
    </div>
    <div class="price">
      合计：　{{totalPrice}}
    </div>
    <div class="calculate" @click="calcClick">去计算：({{checkLength}})</div>
  </div>
</template>

<script>
import CartCheckButton from "./CartCheckButton";
import {mapGetters } from 'vuex'
export default {
  name: "CartButtonBar",
  components: {
    CartCheckButton,
  },
  computed: {
    ...mapGetters(['cartList']),
    totalPrice() {
      return '￥' + this.cartList.filter(item => {
       return  item.checked
      }).reduce((oldValue, item) => {
        let num = parseFloat(item.price.substr(1, item.price.length-1))
        return oldValue + num * item.count
      }, 0)
    },
    checkLength () {
      return this.cartList.filter(item => item.checked).length
    },
    isSelectAll() {
      if(this.cartList.length === 0)  return false
      // 1. 使用高级函数
      // return (!this.cartList.filter(item => !item.checked).length)
      return !this.cartList.find(item => !item.checked)
      // 2. 遍历
      // for(let item of this.cartList) {
      //   if(!item.checked) {
      //     return false
      //   }
      //   return true
      // }
    }
  },
  methods: {
    buttonChange() {
      if(this.isSelectAll) { // 全部选中
        this.cartList.forEach(element => element.checked = false);

      }else { // 没有全部选中(部分不选中)
        this.cartList.forEach(element => element.checked = true);
      }
      // this.cartList.forEach(element => element.checked = !this.isSelectAll);
    },
    calcClick() {

      if(!this.isSelectAll) {
        this.$toast.show("请选择购买的商品");
      }
    }
  }
}
</script>

<style scoped>
  .button-bar {
    display: flex;
    position: relative;
    height: 40px;
    line-height: 40px;
    font-size: 14px;
    background-color: #eee;
  }
  .check-content {
    display: flex;
    align-items: center;
    margin-left: 15px;
    margin-right: 5px;
    width: 90px;
  }
  .check-button {
    width: 20px;
    height: 20px;
    line-height: 18px;
  }
  .price {
    margin-left: 10px;
    flex: 1;
  }
  .button-bar .calculate {
    /* float: right!important; 在flex中不起作用*/
    /* margin-left: 50px; */
    text-align: center;
    width: 90px;
    background-color: red;
    color: #fff;
  }
</style>
