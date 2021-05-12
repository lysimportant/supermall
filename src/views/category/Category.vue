<template>
  <div>
    <scroll class="category" ref="scroll" @scroll="contentScroll" :probe-type="3">
      <ul>
        <li>分类1</li>
        <li>分类2</li>
        <li>分类3</li>
        <li>分类4</li>
        <li>分类5</li>
        <li>分类6</li>
        <li>分类7</li>
        <li>分类8</li>
        <li>分类9</li>
        <li>分类10</li>
        <li>分类11</li>
        <li>分类12</li>
        <li>分类13</li>
        <li>分类14</li>
        <li>分类15</li>
        <li>分类16</li>
        <li>分类17</li>
        <li>分类18</li>
        <li>分类19</li>
        <li>分类20</li>
        <li>分类21</li>
        <li>分类22</li>
        <li>分类23</li>
        <li>分类24</li>
        <li>分类25</li>
        <li>分类26</li>
        <li>分类27</li>
        <li>分类28</li>
        <li>分类29</li>
        <li>分类30</li>
        <li>分类31</li>
        <li>分类32</li>
        <li>分类33</li>
        <li>分类34</li>
        <li>分类35</li>

      </ul>
    </scroll>
    <back-top @click.native="backClick" v-show="isShowBackTop"/>
  </div>
</template>

<script>
import Scroll from "@/components/common/scroll/Scroll";
import {backTopMixin} from "@/common/mixin";

export default {
  name: "Category",
  mixins: [backTopMixin],
  data() {
    return {
      scroll: null
    }
  },
  created() {
    //    this.scroll = new BScroll(document.querySelector('.wrapper'), {} // 没有挂载获取不了模版元素
  },
  mounted() {
  },
  methods: {
    contentScroll(position) {
      // 1. 判断BackTop显示隐藏
      // this.isShowBackTop =  -position.y > BACK_POSITION ? true : false;
      this.ListenerShowBackTop(position)
      // 2. 判断是否吸顶
      this.isTabFixed = -position.y >= this.tabOffsetTop ? true : false;
    }
  },
  components: {Scroll}
}
</script>

<style scoped>
  /*.wrapper {*/
  /*  height: 250px;*/
  /*  background-color: red;*/

  /*  !*overflow: hidden;*!*/
  /*  !*overflow-y: scroll;*!*/
  /*}*/
  ul li {
    height: 400px;
  }
  .category {
    height: 500px;
  }
</style>
