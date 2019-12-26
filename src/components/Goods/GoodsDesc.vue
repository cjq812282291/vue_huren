<template>
  <div class="goodsdesc-container">
    <br />
    <br />
    <h3>{{info.title}}</h3>
    <hr />
    <div class="content" v-html="info.content"></div>
  </div>
</template>

<script>
import { Toast } from 'mint-ui'

export default {
  data() {
    return {
      id: this.$route.params.id,
      // 图文数据
      info: {}
    }
  },
  created() {
    this.getInfo()
  },
  methods: {
    async getInfo() {
      const { data: res } = await this.$http.get('api/goods/getdesc/' + this.id)
      if (res.status !== 0) {
        Toast('获取商品图文数据失败')
      }
      this.info = res.message[0]
    }
  }
}
</script>

<style lang="scss" scoped>
.goodsdesc-container {
  padding: 4px;
  h3 {
    font-size: 16px;
    color: #226aff;
    text-align: center;
    margin: 15px 0;
  }
  .content {
    img {
      width: 100%;
    }
  }
}
</style>
