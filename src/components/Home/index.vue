<template>
  <div>
    <br />
    <!-- 父组件向子组件传值 -->
    <swiper :lunbotuList="lunbotuList" :isfull="true"></swiper>

    <!-- 九宫格改造成六宫格 -->
    <ul class="mui-table-view mui-grid-view mui-grid-9">
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <router-link to="/home/newslist">
          <img src="@/assets/images/menu1.png" alt />
          <div class="mui-media-body">新闻资讯</div>
        </router-link>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <router-link to="/home/photoslist">
          <img src="@/assets/images/menu2.png" alt />
          <div class="mui-media-body">图片分享</div>
        </router-link>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <router-link to="/home/goodslist">
          <img src="@/assets/images/menu3.png" alt />
          <div class="mui-media-body">商品购买</div>
        </router-link>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <router-link to="#">
          <img src="@/assets/images/menu4.png" alt />
          <div class="mui-media-body">留言反馈</div>
        </router-link>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <router-link to="#">
          <img src="@/assets/images/menu5.png" alt />
          <div class="mui-media-body">视频专区</div>
        </router-link>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <router-link to="#">
          <img src="@/assets/images/menu6.png" alt />
          <div class="mui-media-body">联系我们</div>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import { Toast } from 'mint-ui'
import swiper from '../Subcomponents/swiper'
export default {
  data() {
    return {
      // 保存轮播图的数组
      lunbotuList: []
    }
  },
  created() {
    this.getLunbotu()
  },
  methods: {
    async getLunbotu() {
      const { data: res } = await this.$http.get('api/getlunbo')
      if (res.status !== 0) {
        Toast('加载轮播图失败。。。')
      }
      this.lunbotuList = res.message
    }
  },
  // 调用了子组件
  components: {
    swiper
  }
}
</script>

<style lang="scss" scoped>
.mui-grid-view.mui-grid-9 {
  background-color: #fff;
  border: none;
  img {
    width: 60%;
    height: 60%;
  }
  .mui-media-body {
    font-size: 13px;
  }
}
.mui-grid-view.mui-grid-9 .mui-table-view-cell {
  border: 0;
}
</style>
