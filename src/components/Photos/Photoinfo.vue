<template>
  <div clss="photoinfo-container">
    <br />
    <br />
    <h3>{{ photoinfo.title }}</h3>
    <p class="subtitle">
      <span>发表时间:{{ photoinfo.add_time | dateFormat }}</span>
      <span>点击: {{ photoinfo.click }}次</span>
    </p>

    <hr />

    <!-- 缩略图区域 -->
    <div class="thumbs">
      <vue-preview :slides="list"></vue-preview>
    </div>
    <!-- 图片内容区 -->
    <div class="content" v-html="photoinfo.content"></div>
    <!-- 评论子组件 -->
    <comment :id="id"></comment>
  </div>
</template>

<script>
import { Toast } from 'mint-ui'
import comment from '../Subcomponents/comment'
export default {
  data() {
    return {
      // 从路由中获取到的 图片id
      id: this.$route.params.id,
      // 图片详情
      photoinfo: {},
      // 缩略图数组
      list: []
    }
  },
  created() {
    this.getPhotoInfo()
    this.getThumbs()
  },
  methods: {
    // 获取图片详情
    async getPhotoInfo() {
      const { data: res } = await this.$http.get('api/getimageInfo/' + this.id)
      if (res.status !== 0) {
        Toast('获取图片详情数据失败')
      }
      this.photoinfo = res.message[0]
      console.log(this.photoinfo)
    },
    // 获取缩略图
    async getThumbs() {
      const { data: res } = await this.$http.get('api/getthumimages/' + this.id)
      if (res.status !== 0) {
        Toast('获取缩略图数据失败')
      }
      // 循环每个图片数据 补全图片的数据和高
      res.message.forEach(item => {
        // 设置以大图浏览时的宽度
        item.w = 600
        // 设置以大图浏览时的高度
        item.h = 400
        // 关键 小图
        item.msrc = item.src
      })
      this.list = res.message
    }
  },
  components: {
    comment
  }
}
</script>

<style lang="scss" scoped>
.photoinfo-container {
  padding: 3px;
  h3 {
    color: #26a2ff;
    font-size: 15px;
    text-align: center;
    margin: 15px 0;
  }
  .subtitle {
    display: flex;
    justify-content: space-between;
    font-size: 13px;
  }
  .thumbs {
    .my-gallery {
      display: flex;
      flex-wrap: wrap; //默认换行
      figure {
        width: 30%;
        margin: 5px;
        img {
          width: 100%;
          box-shadow: 0 0 8px #999;
          border-radius: 5px;
        }
      }
    }
  }
  .content {
    font-size: 13px;
    line-height: 30px;
  }
}
</style>
