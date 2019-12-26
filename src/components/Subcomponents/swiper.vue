<template>
  <div>
    <!-- 轮播图 -->
    <mt-swipe :auto="4000">
      <!-- 在组件中 使用v-for循环 一定要使用 key -->
      <!-- 将来 谁使用此 轮播图组件 谁为我们传递 lunbotuList -->
      <!-- lunbotuList 应该是 父组件 向 子组件 传值来设置 -->
      <mt-swipe-item v-for="item in lunbotuList" :key="item.id">
        <img :src="item.img" alt :class="{'full': isfull}" />
      </mt-swipe-item>
    </mt-swipe>
  </div>
</template>

<script>
export default {
  // 子组件用 props 声明它期望获得的数据
  props: ['lunbotuList', 'isfull']
}
</script>

<style lang="scss" scoped>
.mint-swipe {
  height: 200px;
  .mint-swipe-item {
    text-align: center;

    img {
      // width: 100%;
      height: 100%;
    }
  }
}

.full {
  width: 100%;
}
</style>
