<template>
  <div>
    <nav-bar>
      <div slot="left" class="back" @click="backClick">
        <img src="~assets/img/common/back.svg" alt="">
      </div>

      <div slot="center" class="title">
        <div v-for="(item, index) in titles"
             :class="{active: currentIndex === index}"
             class="title-item"
             @click="titleClick(index)"
        ><span>{{item}}</span></div>

      </div>
      <div slot="right">...</div>
    </nav-bar>
  </div>
</template>

<script>
import NavBar from "@/components/common/navbar/NavBar";

export default {
  name: "DetailNavBar",
  components: {
    NavBar,
  },
  data() {
    return {
      titles: ['商品', '参数', '评论', '推荐'],
      currentIndex: 0,
    }
  },
  methods: {
    titleClick(index) {
      this.currentIndex = index
      this.$emit("titleClick", index)
    },
    backClick() {
      this.$router.back()
    }
  }
}
</script>

<style scoped>
  .title {
    display: flex;
  }
  .title-item {
    flex: 1;
    font-size: 12px;
  }
  .active {
    color: var(--color-high-text);
  }
  .active span {
    padding: 5px;
    border-bottom: 2px solid var(--color-tint);
  }
  .back img {
    margin-top: 12px;
  }
</style>
