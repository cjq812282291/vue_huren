<template>
  <!-- 我们可以使用 watch 属性监听  父组件传递过来的 max 值 -->
  <div class="mui-numbox" data-numbox-min="1">
    <button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
    <input
      id="test"
      class="mui-input-numbox"
      type="number"
      value="1"
      @change="countChanged"
      ref="numbox"
    />
    <button class="mui-btn mui-btn-numbox-plus" type="button">+</button>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  },
  mounted() {
    // 页面还没渲染成功时 初始化数字选择框
    this.mui('.mui-numbox').numbox()
    console.log(this.max)
  },
  methods: {
    countChanged() {
      // 每当 文本框的数据被修改 立即把最新的数据 通过事件调用 传递给父组件
      // 子组件向父组件传值
      // 第一个传的参数 函数方法名称
      // 第二个传的参数 传给父组件的value值
      this.$emit('getcount', parseInt(this.$refs.numbox.value))
    }
  },
  // 子组件希望父组件要传的属性
  props: ['max'],
  // 属性监听
  watch: {
    // 属性监听
    max: function(newVal, oldVal) {
      // 使用 JS API 设置 numbox 最大值
      this.mui('.mui-numbox')
        .numbox()
        .setOption('max', newVal)
    }
  }
}
</script>

<style>
</style>
