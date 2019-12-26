import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeRouter from './Home'
import MemberRouter from './Member'
import ShopCarRouter from './ShopCar'
import SearchRouter from './Search'
import NewsListRouter from './NewsList'
import NewsInfoRouter from './NewsInfo'
import PhotoListRouter from './PhotoList'
import PhotoInfoRouter from './PhotoInfo'
import GoodListRouter from './GoodList'
import GoodInfoRouter from './GoodInfo'
import GoodDescRouter from './GoodDesc'
import GoodCommentRouter from './GoodComment'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    HomeRouter,
    MemberRouter,
    ShopCarRouter,
    SearchRouter,
    NewsListRouter,
    NewsInfoRouter,
    PhotoListRouter,
    PhotoInfoRouter,
    GoodListRouter,
    GoodInfoRouter,
    GoodDescRouter,
    GoodCommentRouter,
    {
      path: '/',
      redirect: '/home'
    }
  ],
  linkActiveClass: 'mui-active' // 手动设置 被激活的 路由链接的高亮类名
})

export default router
