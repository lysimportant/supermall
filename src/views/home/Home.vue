<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <tab-control :titles="['流行', '新款', '精选']"
                 ref="tabcontrol1"
                 @tabClick="tabClick"
                  class="tab-control"
                  v-show="isTabFixed"/>
    <scroll class="content"
            ref="scroll"
            :probe-type="2"
            :pull-up-load="true"
            @scroll="contentScroll"
            @pullingUp="loadMore">
      <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad"/>
      <recommend-view :recommends="recommends"/>
      <feature-view/>
      <tab-control :titles="['流行', '新款', '精选']"
                   ref="tabcontrol2"
                   @tabClick="tabClick"/>
      <goods-list :goods="showGoods"/>
    </scroll>
    <back-top @click.native="backClick" v-show="isShowBackTop"/>
  </div>
</template>

<script>
  import NavBar from "components/common/navbar/NavBar";
  import TabControl from "components/content/tabControl/TabControl";
  import Scroll from "components/common/scroll/Scroll";
  import GoodsList from 'components/content/goods/GoodsList'

  import HomeSwiper from "./childComps/HomeSwiper";
  import RecommendView from "./childComps/RecommendView";
  import FeatureView from "./childComps/FeatureView";

  import {getHomeMultidata, getHomeGoods} from "network/home";
  import {itemListenerMixin, backTopMixin} from "@/common/mixin";

  export default {
    name: "Home",
    data() {
      return {
        banners: [],
        recommends: [],
        goods: {
          'pop': { page: 0, list: []},
          'new': { page: 0, list: []},
          'sell': { page: 0, list: []},
        },
        currentType: 'pop',
        tabOffsetTop: 0,
        isTabFixed: false,
        saveY: 0,
      }
    },
    mixins: [itemListenerMixin, backTopMixin],
    activated() {
      this.$refs.scroll.scrollTo(0, this.saveY, 0)
      this.$refs.scroll.refresh()
    },
    deactivated() {
      // 1. 保存Y的值
      this.saveY = this.$refs.scroll.scrollY
      // 2.取消全局事件的监听
      this.$bus.$off('itemImageLoad', this.itemImgListener)

    },
    components: {
      HomeSwiper,
      RecommendView,
      FeatureView,
      GoodsList,
      NavBar,
      TabControl,
      Scroll,
    },
    created() {
      // 1. 发送多个网络请求
     this.getHomeMultidata()
     // 2. 请求商品数据
      this.getHomeGoods('pop')
      this.getHomeGoods('new')
      this.getHomeGoods('sell')
    },
    computed: {
      showGoods() {
        return this.goods[this.currentType].list
      }
    },
    mounted() {
      // console.log("Home");
      /*      // 事件的加载完成
            const refresh = debounce(this.$refs.scroll.refresh, 500)
            // 对监听的事件进行保存
            this.itemImgListener = () => { // 3. 监听item中的图片加载完成
              refresh()
            }
            this.$bus.$on('itemImageLoad', this.itemImgListener)*/
    },
    methods: {
      /*
      *   事件监听相关的方法
      * */
      swiperImageLoad() {
        // 3. 获取
        // 所有的组件都有一个属性 $el :用于获取组件中的元素
        this.tabOffsetTop = this.$refs.tabcontrol2.$el.offsetTop;
      },
      tabClick(index) {
        switch (index) {
          case 0:
            this.currentType = 'pop'
            break;
          case 1:
            this.currentType = 'new'
            break;
          case 2:
            this.currentType = 'sell'
            break;
        }
        this.$refs.tabcontrol1.currentIndex = index
        this.$refs.tabcontrol2.currentIndex = index
      },
      loadMore() {
        this.getHomeGoods(this.currentType)
        this.$refs.scroll.scroll.refresh()
      },
      contentScroll(position) {
        // 1. 判断BackTop显示隐藏
        // this.isShowBackTop =  -position.y > BACK_POSITION ? true : false;
        this.ListenerShowBackTop(position)
        // 2. 判断是否吸顶
        this.isTabFixed = -position.y >= this.tabOffsetTop ? true : false;
      },
       /*
       *  网络请求相关的方法
       * */
      getHomeMultidata() {
        getHomeMultidata().then(response => {
          // console.log(response); // this.result = response.data
           this.banners = response.data.banner.list   // 保存数据
           this.recommends = response.data.recommend.list
        })
      },
      getHomeGoods(type) {
        const page = this.goods[type].page +　1
        getHomeGoods(type, page).then(res => {
            // let array = res.data.list const NewArray = [...res.data.list, ...array]
             this.goods[type].list.push(...res.data.list)
             this.goods[type].page +=　1
             this.$refs.scroll.finishPullUp()
        })
      }
    }
  }
</script>

<style scoped>
  #home {
    /*padding-top: 44px;*/
    height: 100vh;
    position: relative;
  }

  .home-nav {
    background-color: var(--color-tint);
    color: #fff;
    /**/
    /*position: fixed;*/
    /*left: 0;*/
    /*right: 0;*/
    /*top: 0;*/
    z-index: 1;
  }
  /*.content {*/
  /*  position: absolute;*/
  /*  overflow: hidden;*/
  /*  top: 44px;*/
  /*  bottom: 49px;*/
  /*  left: 0;*/
  /*  right: 0;*/
  /*}*/
  .content {
    position: absolute;
    overflow: hidden;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
  }
  .tab-control {
    position: relative;
    z-index: 9;
  }
  .content {
    height: calc(100% - 44px - 49px);
    overflow: hidden;
    /*margin-top: 44px!important;*/
  }
  /*.content {*/
  /*  height: calc(100% - 93px);*/
  /*  overflow: hidden;*/
  /*  margin-top: 44px!important;*/
  /*}*/
</style>
