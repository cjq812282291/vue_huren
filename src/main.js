import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import './components/plugins/mint-ui'
// 导入 MUI 的样式表 和Bootstrap 没差别
import './assets/lib/mui/css/mui.min.css'
import './assets/lib/mui/css/icons-extra.css'
// 导入格式化时间插件
import moment from 'moment'
// 引用mui的js
import mui from './assets/lib/mui/js/mui'
// 安装图片预览插件
import VuePreview from 'vue-preview'
// 引用store vuex
import store from './store'

// 配置请求的根路径
axios.defaults.baseURL = 'http://www.liulongbin.top:3005/'
// 给 axios 全局挂载 $http 属性
Vue.prototype.$http = axios
// 给 mui 全局挂载 mui 属性
Vue.prototype.mui = mui
// 全局注册预览组件
Vue.use(VuePreview)

// 定义全局过滤器
Vue.filter('dateFormat', function (dataStr, pattern = 'YYYY--MM--DD HH:mm:ss') {
  return moment(dataStr).format(pattern)
})
Vue.config.productionTip = false

new Vue({
  router,
  // 将store挂载
  store,
  render: h => h(App)
}).$mount('#app')
