import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import FastClick from 'fastclick'
import VueLazyload from "vue-lazyload";
import toast from 'components/common/toast'
// import 
Vue.config.productionTip = false

// 事件总线对象
Vue.prototype.$bus = new Vue()

// 下载toast插件
Vue.use(toast)

// 解决移动端的300ms延迟
FastClick.attach(document.body)

// 图片赖加载
Vue.use(VueLazyload, {
  loading: require('./assets/img/common/placeholder.png')
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

