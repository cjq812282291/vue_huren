<template>
  <!-- 我们可以使用 watch 属性监听  父组件传递过来的 max 值 -->
  <div class="mui-numbox" data-numbox-min="1" style="height: 25px;">
    <button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
    <input
      id="test"
      class="mui-input-numbox"
      type="number"
      value="initcount"
      @change="countChanged"
      ref="numbox"
      readonly
    />
    <button class="mui-btn mui-btn-numbox-plus" type="button">+</button>
  </div>
</template>

<script>
export default {
  mounted() {
    // 初始化数字选择框
    this.mui('.mui-numbox').numbox()
  },
  methods: {
    countChanged() {
      // 每当数量值改变 直接把最新的数量同步到 购物车的 store 覆盖之前的数量值
      this.$store.commit('updateGoodsInfo', {
        id: this.goodsid,
        count: this.$refs.numbox.value
      })
    }
  },
  props: ['initcount', 'goodsid']
}
</script>

<style>
</style>
