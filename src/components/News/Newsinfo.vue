<template>
  <div class="newsinfo-container">
    <br />
    <br />
    <!-- 大标题 -->
    <h3 class="title">{{ newsinfo.title }}</h3>
    <!-- 小标题 -->
    <p class="subtitile">
      <span>发表时间: {{ newsinfo.add_time | dateFormat }}</span>
      <span>点击: {{ newsinfo.click }}次</span>
    </p>
    <hr />
    <!-- 内容区域 -->
    <div class="content" v-html="newsinfo.content"></div>
    <!-- 评论子组件区域 -->
    <comment :id="this.id"></comment>
  </div>
</template>

<script>
import { Toast } from 'mint-ui'
import comment from '../Subcomponents/comment'

export default {
  data() {
    return {
      // 将 url 地址中传递过来的 Id值 挂载到 data上 方便以后调用
      id: this.$route.params.id,
      // 新闻对象
      newsinfo: {}
    }
  },
  created() {
    this.getNewsInfo()
  },
  methods: {
    async getNewsInfo() {
      const { data: res } = await this.$http.get('api/getnew/' + this.id)
      if (res.status !== 0) {
        Toast('新闻详情获取失败')
      }
      this.newsinfo = res.message[0]
    }
  },
  components: {
    comment
  }
}
</script>

<style lang="scss" scoped>
.newsinfo-container {
  padding: 0 4px;
  .title {
    font-size: 16px;
    text-align: center;
    margin: 15px 0;
    color: red;
  }
  .subtitile {
    font-size: 13px;
    color: #662aff;
    display: flex;
    justify-content: space-between;
  }
  .content {
    img {
      width: 100%;
    }
  }
}
</style>
