<template>
  <div class="goodsinfo-container">
    <!-- 小球 -->
    <transition @before-enter="beforeEnter" @enter="enter" @after-enter="afterEnter">
      <div class="ball" v-show="ballFlag" ref="ball"></div>
    </transition>

    <!-- 商品轮播图区域 -->
    <br />
    <div class="mui-card">
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <swiper :lunbotuList="lunbotu" :isfull="false"></swiper>
        </div>
      </div>
    </div>

    <!-- 商品购买区域 -->
    <div class="mui-card">
      <div class="mui-card-header">{{ goodsinfo.title }}</div>
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <p class="price">
            市场价:
            <del>￥{{ goodsinfo.market_price }}</del>&nbsp;&nbsp;销售价:
            <span class="now_price">￥{{ goodsinfo.sell_price }}</span>
          </p>

          <p>
            购买数量:
            <!-- 把父组件中的库存数据 作为max值数据 传给子组件 -->
            <!-- 父组件调用子组件传过来的方法 -->
            <!-- 按钮属于 goodsinfo 页面 数字属于 numberbox 组件 -->
            <numbox @getcount="getSelectedCount" :max="goodsinfo.stock_quantity"></numbox>
          </p>
          <p>
            <mt-button type="primary" size="small">立即购买</mt-button>
            <mt-button type="danger" size="small" @click="addToShopCar">加入购物车</mt-button>
          </p>
        </div>
      </div>
    </div>

    <!-- 商品参数区域 -->
    <div class="mui-card">
      <div class="mui-card-header">商品参数</div>
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <p>商品货号:{{ goodsinfo.goods_no }}</p>
          <p>库存情况:{{ goodsinfo.stock_quantity }}件</p>
          <p>上架时间:{{ goodsinfo.add_time | dateFormat}}</p>
        </div>
      </div>
      <div class="mui-card-footer">
        <mt-button type="primary" size="large" plain @click="goDesc(id)">图文介绍</mt-button>
        <mt-button type="danger" size="large" plain @click="goComment(id)">商品评论</mt-button>
      </div>
    </div>
  </div>
</template>

<script>
import { Toast } from 'mint-ui'
import swiper from '../Subcomponents/swiper'
import numbox from '../Subcomponents/goodsinfo_numbox'
export default {
  data() {
    return {
      // 将路由传过来参数中的 id 挂载到data上
      id: this.$route.params.id,
      // 轮播图的数据
      lunbotu: [],
      // 获取到的商品的信息
      goodsinfo: {},
      // 控制小球的显示和隐藏
      ballFlag: false,
      // 保存用户选中的商品数量 默认为1
      selectedCount: 1
    }
  },
  // ajax请求最好放在created里面
  // 因为此时已经可以访问this了，请求到数据就可以直接放在data里面。
  created() {
    this.getLunbotu()
    this.getGoodsInfo()
  },
  methods: {
    // 获取轮播图数据
    async getLunbotu() {
      const { data: res } = await this.$http.get('api/getthumimages/' + this.id)
      if (res.status !== 0) {
        Toast('获取商品轮播图数据失败')
      }
      // 先循环遍历轮播图数组的每一项 为 item 添加 img 属性
      //  因为轮播图组件中 只认识 item.img 不认识 item.src
      res.message.forEach(item => {
        item.img = item.src
      })
      this.lunbotu = res.message
      //   console.log(this.lunbotu)
    },
    // 获取商品详情数据
    async getGoodsInfo() {
      const { data: res } = await this.$http.get('api/goods/getinfo/' + this.id)
      if (res.status !== 0) {
        Toast('获取商品详情数据失败')
      }
      this.goodsinfo = res.message[0]
    },
    // 根据Id 点击使用编程式导航跳转到 图文
    goDesc(id) {
      this.$router.push({ name: 'goodsdesc', params: { id } })
    },
    // 根据Id 跳转到评论
    goComment(id) {
      this.$router.push({
        name: 'goodscomment',
        params: { id }
      })
    },
    // 添加到购物车
    addToShopCar() {
      this.ballFlag = !this.ballFlag
      // { id: 商品的id count: 要购买的数量 price: 商品的单价 selected: false }
      // 拼接出一个 要保存到 store 中 car 数组的 商品对象信息
      var goodsinfo = {
        id: this.id,
        count: this.selectedCount,
        price: this.goodsinfo.sell_price,
        selected: true
      }

      // 调用 store 中 mutations 将商品 加入购物车
      this.$store.commit('addToCar', goodsinfo)
    },
    // 点击之前
    beforeEnter(el) {
      // 初始化坐标(0,0)
      el.style.transform = 'translate(0, 0)'
    },
    // 点击时
    enter(el, done) {
      // 获取某个元素相对于视窗的位置 四个参数 的集合
      // 1.获取小球在 页面中的位置
      const ballPosition = this.$refs.ball.getBoundingClientRect()
      // 2.获取徽标在 页面中的位置
      const badgePosition = document.getElementById('badge').getBoundingClientRect()
      // 3.然后 徽标和小球的 X值 Y值  求差
      const xDist = badgePosition.left - ballPosition.left
      const yDist = badgePosition.top - ballPosition.top
      // 4.根据两个差值进行平移
      el.style.transform = `translate( ${xDist}px, ${yDist}px )`
      // 5.控制变化的速度曲线
      // cubic-bezier(<x1>,<y1>,<x2>,<y2>)
      el.style.transition = 'all 0.5s cubic-bezier(.4,-0.3,1,.68)'
      // 动画结束
      done()
    },
    // 点击之后
    afterEnter(el) {
      // 把 true 重置成 false
      this.ballFlag = !this.ballFlag
    },
    getSelectedCount(count) {
      // 当子组件 把 选中的数量传递给父组件 把选中的值 保存到 data 上
      this.selectedCount = count
      console.log('父组件拿到的数量值为:' + this.selectedCount)
    }
  },
  components: {
    swiper,
    numbox
  }
}
</script>

<style lang="scss" scoped>
.goodsinfo-container {
  background-color: #eee;
  // 内容会被修剪，并且其余内容是不可见的。
  overflow: hidden;
  .now_price {
    color: red;
    font-size: 16px;
    font-weight: bold;
  }
  .mui-card-footer {
    // 换行
    display: block;
    button {
      margin: 15px 0;
    }
  }
  .ball {
    width: 15px;
    height: 15px;
    border-radius: 50%;
    background-color: red;
    position: absolute;
    z-index: 99;
    top: 390px;
    left: 145px;
  }
}
</style>
