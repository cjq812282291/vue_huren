<template>
  <div class="app-container">
    <!-- 顶部 Header 区域 -->
    <mt-header fixed title="湖人总冠军">
      <span slot="left" @click="goback" v-show="flag">
        <mt-button icon="back">返回</mt-button>
      </span>
    </mt-header>

    <!-- 占位符 中间的区域 -->
    <router-view></router-view>

    <!-- 底部 bar 区域 -->
    <nav class="mui-bar mui-bar-tab">
      <router-link class="mui-tab-item" to="/home">
        <span class="mui-icon mui-icon-home"></span>
        <span class="mui-tab-label">首页</span>
      </router-link>
      <router-link class="mui-tab-item" to="/member">
        <span class="mui-icon mui-icon-contact"></span>
        <span class="mui-tab-label">会员</span>
      </router-link>
      <router-link class="mui-tab-item" to="/shopcar">
        <span class="mui-icon mui-icon-contact">
          <span class="mui-badge" id="badge">0</span>
        </span>
        <span class="mui-tab-label">购物车</span>
      </router-link>
      <router-link class="mui-tab-item" to="/search">
        <span class="mui-icon mui-icon-search"></span>
        <span class="mui-tab-label">搜索</span>
      </router-link>
    </nav>
  </div>
</template>

<script>
export default {
  data() {
    return {
      flag: false
    }
  },
  // 根据当前监听到的路径进行判断
  // 页面渲染成功 数据初始化 可以使用this属性
  created() {
    if (this.$route.path === '/home') {
      this.flag = false
    } else {
      this.flag = true
    }
  },
  methods: {
    goback() {
      // 点击后退到上一页
      this.$router.go(-1)
    }
  },
  // 监听路径地址的改变
  watch: {
    '$route.path': function(newval) {
      if (newval === '/home') {
        this.flag = false
      } else {
        this.flag = true
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.mint-tabbar > .mint-tab-item.is-selected {
  background-color: #26a2ff;
  color: black;
}
</style>
