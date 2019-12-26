<template>
  <div>
    <br />
    <br />
    <!-- 顶部滑动条 区域 -->
    <div id="slider" class="mui-slider">
      <div
        id="sliderSegmentedControl"
        class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted"
      >
        <div class="mui-scroll">
          <a
            :class="['mui-control-item', item.id === 0 ? 'mui-active' : '' ] "
            v-for="item in cates"
            :key="item.id"
            @click="getPhotoListByCateId(item.id)"
          >{{item.title}}</a>
        </div>
      </div>
    </div>
    <!-- 图片列表区域 -->
    <ul class="photo-list">
      <router-link v-for="item in list" :key="item.id" :to="'/home/photosinfo/' + item.id" tag="li">
        <img :src="item.img_url" />
        <div class="info">
          <h1 class="info-title">{{ item.title }}</h1>
          <div class="info-body">{{ item.zhaiyao }}</div>
        </div>
      </router-link>
    </ul>
  </div>
</template>

<script>
import { Toast } from 'mint-ui'

export default {
  data() {
    return {
      // 所有分类的列表数组
      cates: [],
      // 图片列表数组
      list: []
    }
  },
  mounted() {
    // 当组件 的DOM 结构渲染好 并放到页面中 会执行这个钩子函数
    // mounted 这里的DOM 是最新的
    // 初始化滑动控件
    this.mui('.mui-scroll-wrapper').scroll({
      deceleration: 0.0005 // flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
    })
  },
  created() {
    this.getAllCategory()
    // 默认进去页面 就主动请求图片
    this.getPhotoListByCateId(0)
  },
  methods: {
    // 获取图片分类数据
    async getAllCategory() {
      const { data: res } = await this.$http.get('api/getimgcategory')
      if (res.status !== 0) {
        Toast('获取分类列表失败')
      }
      // 手动拼接一个最完整的 分类列表
      res.message.unshift({
        title: '全部',
        id: 0
      })
      this.cates = res.message
    },
    // 根据 分类Id 获取图片列表
    async getPhotoListByCateId(cateId) {
      const { data: res } = await this.$http.get('api/getimages/' + cateId)
      if (res.status !== 0) {
        Toast('获取图片列表失败')
      }
      this.list = res.message
    }
  }
}
</script>

<style lang="scss" scoped>
.photo-list {
  list-style: none;
  margin: 0;
  padding: 10px;
  padding-bottom: 0;
  li {
    background-color: #ccc;
    text-align: center;
    margin-bottom: 10px;
    box-shadow: 0 0 9px #999;
    position: relative;
    img {
      width: 100%;
      // 垂直居中对齐
      vertical-align: middle;
    }

    .info {
      color: white;
      text-align: left;
      position: absolute;
      bottom: 0;
      // 0.4透明度
      background-color: rgba(0, 0, 0, 0.4);
      max-height: 84px;
      .info-title {
        font-size: 14px;
      }
      .info-body {
        font-size: 13px;
      }
    }
  }
}
</style>
