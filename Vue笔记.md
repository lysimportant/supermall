# slot 插槽

- 普通插槽
  - 直接在插槽中间写
- 具名插槽
  - 添加 name 属性
- 插槽的作用域
  - 父的访问父的,子的访问子的
- 在父组件访问子组件的 slot 时，可以让子组件的 slot 绑定一个属性名，在父组件调用子组件时添加 template 模块并绑定 v-slot 属性随后 slot.属性名就可以调用
- 内容相差很大的时候使用插槽，只是文字类型的简单类型可以不适用插槽

_　 runtime-compiler 和 runtime-only
_ template -> ast -> render -> VDOM -> UI \*　 render -> VDOM -> UI

- 函数调用 -> 压入函数站(保存函数调用过程中的所有变量)
- 函数调用结束 -> 弹出函数站(释放函数所有的变量)

* vue2.0
  - vue init webpack projectname
    - name
    - 描述信息
    - 作者
    - 运行版本 template-compiler only
    - 路由的选择安装
    - Eslint 语法检查（限制）
      - Standard (https://github.com/standard/standard)
      - Airbnb (https://github.com/airbnb/javascript)
      - none (configure it yourself)
    - 单元测试
    - e2e(end to end)(端到端测试) -> selenium

vue ui --> ui 操作
vue init --> vue2 的脚手架的创建
vue create --> vue3 的脚手架的创建

node-module @vue ....

- 前端渲染：
  - 后台返回数据，由前台接收通过 js 代码进行处理渲染到页面中
- 后端渲染:
  - 前台发送请求到后台,后台把 JS+HTML+CSS+数据处理好后返回给前台显示
- 前后端分离: Ajax
  - 前端: 发送请求接收到后端返回的数据处理成 JS+HTML+CSS 到页面上显示
  - 后端: 接收到前端发送的请求返回数据
- SPA (single page web application)
  - 一个页面多个组件(页面)
- history
  1.  history.go(Number) 前进或后退
  2.  history.pushState({}, '', 'url') 推
  3.  history.replaceState({}, '', 'url') 替换
  4.  history.back() 后退一次
  5.  history.forward() 前进一次
- router 的配置

  - `routes: [ { path: '/about', component: About'}, {path: '', redirect: '/home'}]`
  - `redirect`:重定向路由的位置

- VueRouter 实例的属性/方法
  - 路由默认使用的是 hash 路由在配置里面添加 `mode: 'history'` 就可以切换路由的方式
  - 设置`linkActiveClass: 'name'` 统一设置 active 中的按钮样式,不用一直写 `active-class`(可以代替 router-link 的属性)
  - `$router` 可以操作路由的状态 类型 H5 的`history` 如: push replace
  - `$route` 谁在 active 状态就能获取到对应的 router 可以获取路由的值 params search state
- query 绑定

```
  this.$router.push/replace.({
        path:'/data',
        query:{
           id
        }})
```

- 动态绑定

```
在路由组件:
  rotes: [{
      path: '/detail/:id',
      component: Detail
    }]
```

- `<router-link :to="/user/+userid">用户</router-link>`

- `<router-link>`: 该标签是一个 vue-router 中已经内置的组件, 它会被渲染成一个`<a>`标签.
  - `to` 跳转路由的参数
  - `tag` 设置标签如 button li 等 不再只是单一个 a 标签
  - `replace` 替换,不会留下 history 记录,不可以回退
  - `router-link-active` 自带类名属性设置样式(可以被 VueRouter 实例的方法代替) -- `router-link-exact-active` 自带的另一个类名
    - 不想要过长的类名可以使用`active-class='name'`来修改类名属性的名字
- 路由的嵌套

  - 在需要嵌套的主路由下添加 children:[]方法 子路由直接写名称即可前面不需要加 /
    router 会自动添加 然后去对应的主路由组件上添加 子路由的 跳转 还需`<router-link>`要`<router-view>` 让它显示(站)出来

- `<router-view>`: 该标签会根据当前的路径, 动态渲染出不同的组件.网页的其他内容, 比如顶部的标题/导航, 或者底部的一些版权信息等会和`<router-view>`处于同一个等级.
  在路由切换时, 切换的是`<router-view>`挂载的组件, 其他内容不会发生改变.
- 路由懒加载
  1.  Webpack 结合 Vue 异步组件: `const Home = resolve => { equire.ensure(['../components/Home.vue'], () => { resolve(require('../components/Home.vue')) })};`
  2.  AMD 写法: `const About = resolve => require(['../components/About.vue'], resolve);`
  3.  ES6 组织 Vue 异步组件: `const Home = () => import('../components/Home.vue')`
- 路由的参数传递:　`query/params` 传递参数的两种方式
  - URL: 协议://主机:端口号/路径?查询
  - scheme://host:port/path?query#fragment
  - `params` 配置路由的格式 /router/:id 传递方式:path 后面跟上对应的值 形成的路径: /router/Lys
  - `query` 配置路由的格式 /router/{} 传递方式:对象中使用 query 的 key 作为传递方式 形成的路径: /router?id=Lys&age=18
- `$route/$router`的区别:
  - 同为 VueRouter 实例的方法:`$router` 路由跳传方法 参数的设置 `$route` active 中的路由状态
  - 所有的组件继承于 Vue 类的原型
- router 的导航守卫
  - router.beforeEach((to, from, next) => {}) : 全局守卫,路由更新完成前调用
  - router.afterEach((to, from) => {}) : 全局守卫,路由更新完成后调用
- keep-alive 保存组件的状态而不是切换路由后直接销毁
  - `activated` 状态 active 时调用的 Vue 实例的方法 `deactivated`状态:notActive
    - 这两个函数,只有该组件被保持了状态使用了 keep-alive 时,才有效的
- 别名的配置 路径太长

```
webpack
	resolve: {
		extensions: ['.js', '.vue', '.json'],
			alias: {
				'@': resolve('src'),
				'components': resolve('src/components'),
				'assets': resolve('src/assets'),
				'views': resolve("src/views")
		}
	}
```

- Promise -> fetch Ajax

  - 用于 异步 网络 请求 等防止网页的阻塞
  - 链式调用 ->
  - 一个结果需要两次调用可以使用 Promise.all([])

- Vuex

  - 状态管理: 1. 创建一个公共对像保存到 Vue.prototype 中此时所有的组件都可以访问一个公共的对象实现资料的分享,但不是响应式的
  - npm install vuex --save 下载插件依赖
  - Vue -> Mutations -> State :　同步任务
  - Vue -> Actions -> Mutations -> State : 异步任务
  - store -> mutations 定以方法 -> 组件的调用 `this.$store.commit('increment');`

- State 单一状态树(数据源) (single Source of Truth)

  - 保持只有一个 sot

- getters 得到某一些数据 |数据 | |方法 | | 根标签 |

  - getters 里的方法: fn(store, getters, rootState) {} 第一个参数是 store(状态) 第二个参数是 getters 本身 第三个参数 rootState(根元素/标签)
  - 如需要接收 store,getters 以外的参数需要 return 一个 function 以此来接收第三个参数
  - 直接导入到组件的计算属性不用使用$sotre.getters 来获取 需要导入 : import {mapGetters} from 'vuex'

- mutations: 改变 State 数据必须通过 mutations 来操作 只能处理同步任务,异步任务需要用 Actions 来调用 mutations
  name(state(Vuex 状态), payload(传来的数据))

  - 调用的方式: `this.$store.commit(INCREMENT)`
  - type(state) -> 事件类型 () {fn} -> 回调函数 ::--> 事件类型:fnName (state) {fn}:回调函数
  - 传递第二个参数用逗号分割 组件调用自己的方法来调用 mutations 的方法 addCount(count) {this.$store.commit('incrementCount', count) }
  - 提交风格:
    - 普通风格: this.$store.commit('incrementCount', count) }
    - 特殊风格: 添加 type 属性 this.$store.commit({type: 'incrementCount', // 类型 count}) mutations 的接收需要用到 payload
  - 本来存储并设置的属性是可以做到响应式的,但后来添加进去的没有响应式的效果 如果后来添加的也需要响应式的效果,可以用 Vue.set() 删除的响应式可以使用 Vue.dalete()
  - 方法的名字创建一个文件来定以常量,再用常量的名字替换原来的名字(保证有约束)

- Actions 处理异步任务,mutation 只能完成同步任务
  name(context(上下文), payload(传来的数据))

  - 调用方法: `this.$store.dispatch(INCREMENT)`
  - 特殊提交/异步方法的对象方式需要用到 payload 接收参数
  - 被组件调用,可以返回一个 Promise 对象给组件操作.then 谁调用 Promise 就返回给谁
  - context : 调用此方法处理完成异步任务进入同步任务 context.commit('data')
  - context 方法: commit dispatch getters rootGetters rootState state

- modules 模块分发

  - 定以模块分割功能: state actions getters mutations
  - 最后会合并到 state 状态里面 获取的方法: `$store.state.modules:name.name`
  - modules 模块的提交也是直接`this.$store.commit("Name", "data')`和 state 的提交一样

- vuex 可以将方法映射到组件中 import {mapGetters, mapActions} from 'vuex'

- axios 网络请求
  - API 接口： http://123.207.32.32:8000/home/multidata
  - axios.get/post(url, {})
  * axios.all([]) 并发请求

* Vue 项目的准备工作

  1. 划分目录的结构
  2. 引用两个 CSS 文件
  3. 配置相关文件如 路径的别名: { vue.config.js -> configureWebpack:{ alias:{} (配置别名) }(覆盖配置文件) } - .editorconfig
  4. 项目模块划分: TabBar -> router 的映射关系

* 导航栏的封装
  - {左(60px)中右(60px)}ling-height: 44px
* 网络模块
  - 一个页面的网络请求封装对应的 network 再用这 network 访问 network(顶层封装) 相当于多了一个中间层方便管理
* Home 组件
  - created() 当组件创建完成后发送 axios(网络请求) 通过.then 提取数据 (因为顶层封装的 axios 返回的是一个 Promise)
  -
* BScroll
  - 图片异步加载导致高度不对问题：使用 scroll.refresh() 重新计算高度
  - 原生 JS: img.onload() 图片加载完成
  - Vue: @load=''
* Vue 事件总线
  - 在 Vue 的原型上添加$bus
  - Vue.prototype.$bus = new Vue()
    - this.$bus.$emit('Load')
    - this.$bus.$on('Load')
* 真实数据抽取:
  - result(信息) -> itemInfo(商品信息) -> topImages(轮播图片)
* 判断是否时空对象
  - Object.key(obj).length
* 组件中有的一个属性取出两个名，可以使用 computed：计算属性 || :return this.goodsItem.image || this.goodsItem.show.img

* mixin 混入 和组件的生命周期合并

* Toast 弹窗

* fastclick 移动端 300ms 延迟

* 图片赖加载

  - vue-lazyload
  - 安装
  - 引入
  - Vue.use(VueLazyLoad)注册
  - src="" -> v-lazy="""
  - 第二个参数: loading(占位图->图片没有完成加载时显示)等等

* px2vw 像素单位的转换 vw npm i postcss-px-to-viewport --save
  -
* px2rem

*  nginx.org  localhost

![img.png](img.png)