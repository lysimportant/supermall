<template>
  <div class="cart-list">
   <scroll class="content" ref="scroll">
     <cart-list-item v-for="(item, index) in cartList"
                     :item="item"
                     :key="index"/>
   </scroll>
  </div>
</template>

<script>
  import Scroll from "@/components/common/scroll/Scroll";
  import {mapGetters} from 'vuex'

  import CartListItem from "./CartListItem";


  export default {
    name: 'CartList',
    computed: {
      ...mapGetters(['cartList'])
    },
    components: {
      Scroll,
      CartListItem
    },
    activated() {
      this.$refs.scroll.refresh()
      console.log('--');
    }
  }
</script>

<style scoped>
  .cart-list {
    height: calc(100vh - 44px - 49px - 40px);
  }
  .content {
    height: 100%;
    overflow: hidden;
  }
</style>
