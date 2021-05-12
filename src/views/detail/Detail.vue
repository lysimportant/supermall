<template>
    <div class="detail">
      <detail-nav-bar @titleClick="titleClick" ref="DetailNav"/>
      <scroll class="detail-scroll" ref="scroll" @scroll="contentScroll" :probe-type="3">
<!--        属性： topImage 传入值： top-image-->
        <detail-swiper :top-images="topImages" ref="detailImage"/>
        <detail-base-info :goods="goods"/>
        <detail-shop-info :shop="shop"/>
        <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"/>
        <detail-params :param-info="paramsInfo" ref="params"/>
        <detail-comment-info :comment-info="commentInfo" ref="comment"/>
        <goods-list :goods="recommend" ref="recommend"/>

      </scroll>
      <back-top @click.native="backClick" v-show="isShowBackTop"/>
      <detail-bottom-bar @addCart="addToCart"/>
      <!-- <toast :message="message" :show="show"/> -->
    </div>
</template>


<script>
  import Scroll from "components/common/scroll/Scroll";
  import GoodsList from "components/content/goods/GoodsList";
  // import Toast from 'components/common/toast/Toast'

  import DetailNavBar from "./childComps/DetailNavBar";
  import DetailSwiper from "./childComps/DetailSwiper";
  import DetailBaseInfo from "./childComps/DetailBaseInfo";
  import DetailShopInfo from "./childComps/DetailShopInfo";
  import DetailGoodsInfo from "./childComps/DetailGoodsInfo";
  import DetailParams from "./childComps/DetailParams";
  import DetailCommentInfo from "./childComps/DetailCommentInfo";
  import DetailBottomBar from "./childComps/DetailBottomBar";

  import {getDetail, Goods, Shop, GoodsParam, getRecommend} from "@/network/detail";
  import {itemListenerMixin, backTopMixin} from "@/common/mixin";
  import {debounce} from "@/common/utils";

  import {mapGetters, mapActions} from 'vuex'

  export default {
  name: "Detail",
  components: {
    Scroll,
    GoodsList,
    // Toast,
    DetailSwiper,
    DetailNavBar,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParams,
    DetailCommentInfo,
    DetailBottomBar,
    getDetail
  },
  mixins: [itemListenerMixin, backTopMixin],
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramsInfo: {},
      commentInfo: {},
      recommend: [],
      themeTopYs: [],
      getThemeTopY: null,
      currentIndex: 0,
      // message: '',
      // show: false
    }
  },
  created() {
    // 1. 保存传入的iid
    this.iid = this.$route.params.iid
    // 2. 根据iid请求详情数据
    getDetail(this.iid).then(response => {
      // 1. 获取顶部轮播数据
      const data = response.result
      this.topImages = data.itemInfo.topImages
      // 2. 获取商品信息
      this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)
      // 3. 获取店铺信息
      this.shop = new Shop(data.shopInfo)
      // 4. 获取商品的详情数据
      this.detailInfo = data.detailInfo
      // 5. 获取参数信息
      this.paramsInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)
      // 6.获取评论信息
      if(data.rate.cRate !== 0) {
        this.commentInfo = data.rate.list[0]
      }
      /*
      DOM没有渲染
      this.themeTopYs.push(0)
      this.themeTopYs.push(-this.$refs.params.$el.offsetTop)
      this.themeTopYs.push(-this.$refs.comment.$el.offsetTop)
      this.themeTopYs.push(-this.$refs.recommend.$el.offsetTop)
      console.log(this.themeTopYs);*/
      this.$nextTick(() => {
      /*  图片没有加载完成
          this.themeTopYs = []
          this.themeTopYs.push(0)
          this.themeTopYs.push(-this.$refs.params.$el.offsetTop)
          this.themeTopYs.push(-this.$refs.comment.$el.offsetTop)
          this.themeTopYs.push(-this.$refs.recommend.$el.offsetTop)
          console.log(this.themeTopYs);*/
      })


    })
    getRecommend().then(response => {
        this.recommend = response.data.list
      })
    // 4. 给getThemeTopY赋值 给函数赋值进行防抖
      this.getThemeTopY = debounce(() => {
        this.themeTopYs = []
        this.themeTopYs.push(0)
        this.themeTopYs.push(this.$refs.params.$el.offsetTop)
        this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
        this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
        this.themeTopYs.push(Number.MAX_VALUE)
      },100)
  },
  methods: {
    ...mapActions(['addCart']),
    imageLoad() {
      // this.$refs.scroll.refresh()
      this.refresh()
      this.getThemeTopY()
    },
    titleClick(index) {
      this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 200)
    },
    contentScroll(position) {
      const positionY = -position.y;
      let length = this.themeTopYs.length
      for (let i = 0; i < length-1; i++) {
        if(this.currentIndex !== i && (positionY >= this.themeTopYs[i] && positionY < this.themeTopYs[i+1])) {
          this.currentIndex = i;
          this.$refs.DetailNav.currentIndex = this.currentIndex;
          // console.log(this.currentIndex);
        }
        this.ListenerShowBackTop(position)

        // this.isShowBackTop =  -position.y > BACK_POSITION ? true : false;
       /* if((this.currentIndex !== i) && (
          (i < length - 1 &&　positionY >= this.themeTopYs[i] && positionY < this.themeTopYs[i+1])
            || (i === length - 1 && positionY >= this.themeTopYs[i]))) {
          this.currentIndex = i;
          console.log(i);
          // this.$refs.navbar.currentIndex = this.currentIndex
        }*/
      }
    },
    addToCart() {
      // 1. 获取需要的展示参数数据
      const product = {};
      product.image = this.topImages[0]
      product.title = this.goods.title
      product.desc = this.goods.desc
      product.price = this.goods.newPrice
      product.iid = this.iid
      product.checked = false

      // 将商品添加到购物车
      // this.$store.commit("addCart", product)
      // this.$store.dispatch("addCart", product).then(res => {
      //   console.log(res)
      // })
      this.addCart(product).then(res => {
        // this.show = true
        // this.message = res
        // setTimeout(() => {
        //  this.show = false
        // this.message = ''
        // }, 1500)
        console.log(this.$toast);
        this.$toast.show(res)
      })
      //  添加购物车成功
    }
  },
  mounted() {

    // console.log("Detail");
    /*  const refresh = debounce(this.$refs.scroll.refresh, 500)
      this.itemImgListener = () => { // 3. 监听item中的图片加载完成
        refresh()
      }
      this.$bus.$on('itemImageLoad', this.itemImgListener)*/
  },
  destroyed() {
    // 2.取消全局事件的监听
    this.$bus.$off('itemImageLoad', this.itemImgListener)
  }
}
</script>

<style scoped>
  .detail {
    height: 100vh;
    position: relative;
    z-index: 1;
    background-color: #ffffff;
  }
  .detail-scroll {
    height: calc(100% - 44px - 2.09rem);
    overflow: hidden;
  }
</style>
