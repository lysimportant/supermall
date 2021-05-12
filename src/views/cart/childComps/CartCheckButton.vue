<template>
   <div class="item_check">
    <img src="~assets/img/cart/tick.svg" class="check_box" :class="{ checked: isChecked }" alt=""/>
  </div>

</template>
<script>
export default {
  props: {
    isChecked: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {};
  }
};
</script>
<style scoped>
.item_check {
  width: 1.2rem;
}
.check_box {
  position: relative;
  top: calc(50% - 0.35rem);
  /*width: 0.7rem;*/
  /*height: 0.7rem;*/
  width: 15px;
  height: 15px;
  margin: 0 auto;
  /*border-radius: 0.35rem;*/
  border-radius: 10px;

  border: 0.04rem solid rgba(128, 128, 128, 0.4);
}

 .checked {
  /*width: 1rem;*/
  /*height: 1rem;*/
  width: 15px;
  height: 15px;
  border-style: none;
  top: calc(50% - 0.5rem);
  background: url("~assets/img/cart/yes.svg") 0 0/90% no-repeat;
}
</style>
