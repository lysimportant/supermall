import {debounce} from "@/common/utils";
import {BACK_POSITION} from "@/common/const";
import BackTop from "components/content/backTop/BackTop";

export const itemListenerMixin = {
  // components/computed
  data() {
    return {
      itemImgListener: null,
      refresh: null,
    }
  },
  mounted() {
    this.refresh = debounce(this.$refs.scroll.refresh, 500)
    this.itemImgListener = () => { // 3. 监听item中的图片加载完成
      this.refresh()
    }
    this.$bus.$on('itemImageLoad', this.itemImgListener)
    // console.log('Mixin');
  }
}

export const backTopMixin = {
  data() {
    return {
      isShowBackTop: false,
    }
  },
  components: {
    BackTop,
  },
  methods: {
    backClick() {
      // this.$refs.scroll.scroll.scrollTo(0, 0, 500)
      this.$refs.scroll.scrollTo(0, 0, 500)
    },
    ListenerShowBackTop(position) {
      this.isShowBackTop =  -position.y > BACK_POSITION ? true : false;
    }
  }
}
