<template>
  <div class="cmt-container">
    <h3>发表评论</h3>
    <hr />

    <textarea placeholder="请输入要BB的内容(最多吐槽120字)" maxlength="120" v-model="msg"></textarea>

    <mt-button type="primary" size="large" @click="postComment">发表评论</mt-button>
    <div class="cmt-list">
      <div class="cmt-item" v-for="(item, i) in comments" :key="item.add_time">
        <div
          class="cmt-title"
        >第{{ i+1 }}楼&nbsp;&nbsp;用户: {{ item.user_name }}&nbsp;&nbsp;发表时间: {{ item.add_time | dateFormat }}</div>
        <div class="cmt-body">{{ item.content === 'undefined' ? '此用户很懒': item.content }}</div>
      </div>
    </div>

    <mt-button type="danger" size="large" plain @click="getMore">加载更多</mt-button>
  </div>
</template>

<script>
import { Toast } from 'mint-ui'

export default {
  data() {
    return {
      // 默认展示第一页数据
      pageindex: 1,
      // 所有的评论数据
      comments: [],
      // 评论输入的内容
      msg: ''
    }
  },
  created() {
    this.getComments()
  },
  methods: {
    // 获取评论
    async getComments() {
      const { data: res } = await this.$http.get('api/getcomments/' + this.$route.params.id + '?pageindex=' + this.pageindex)
      if (res.status !== 0) {
        Toast('获取评论数据失败')
      }
      // 每当获取新评论数据的时候 不要把老数据清空 而是应该老数据 拼接上 新数据
      this.comments = this.comments.concat(res.message)
    },
    // 加载更多
    getMore() {
      this.pageindex++
      this.getComments()
    },
    // 发表评论
    async postComment() {
      // trim()函数会移除字符串开始和末尾处的所有换行符，空格(包括连续的空格)和制表符。如果这些空白字符在字符串中间时，它们将被保留，不会被移除。
      if (this.msg.trim().length === 0) {
        return Toast('评论不能为空')
      }
      // 发表评论
      // 参数1 请求的url地址
      // 参数2 提交给服务器的数据对象 { content: this.msg }
      // 参数3 定义提交时候 表单数据的格式 { emulateJSON: true }
      const { data: res } = await this.$http.post('api/postcomment/' + this.$route.params.id, {
        content: this.msg.trim()
      })
      if (res.status !== 0) {
        Toast('发表评论失败')
      }
      // 1. 拼接出一个评论对象
      var cmt = {
        user_name: '匿名用户',
        add_time: Date.now(),
        content: this.msg.trim()
      }
      // 2.将这条评论添加到数组的开头
      this.comments.unshift(cmt)
      // 3.清空评论输入
      this.msg = ''
    }
  },
  // 子组件用 props 声明它期望获得的数据
  props: ['id']
}
</script>

<style lang="scss" scoped>
.cmt-container {
  h3 {
    font-size: 18px;
  }
  textarea {
    font-size: 14px;
    height: 85px;
    margin: 0;
  }
  .cmt-list {
    margin: 5px 0;
    .cmt-item {
      font-size: 13px;
      .cmt-title {
        background-color: #ccc;
        line-height: 30px;
      }
      .cmt-body {
        line-height: 35px;
        // 文本块中首行文本的缩进
        // em 相对长度单位
        // 文本缩进两字符
        text-indent: 2em;
      }
    }
  }
}
</style>
