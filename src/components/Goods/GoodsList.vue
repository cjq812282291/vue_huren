<template>
  <div class="goods-list">
    <div class="goods-item" v-for="item in goodslist" :key="item.id" @click="goDetail(item.id)">
      <img :src="item.img_url" alt />
      <h1 class="title">{{item.title}}</h1>
      <div class="info">
        <p class="price">
          <span class="now">{{item.sell_price}}</span>
          <span class="old">{{item.market_price}}</span>
        </p>

        <p class="sell">
          <span>热卖中</span>
          <span>{{item.stock_quantity}}件</span>
        </p>
      </div>
    </div>
    <mt-button type="danger" size="large" @click="getMore">加载更多</mt-button>
  </div>
</template>

<script>
import { Toast } from 'mint-ui'

export default {
  data() {
    return {
      // 分页的页数
      pageindex: 1,
      goodslist: []
    }
  },
  created() {
    this.getGoodsList()
  },
  methods: {
    // 获取商品列表的数据
    async getGoodsList() {
      const { data: res } = await this.$http.get('api/getgoods?pageindex=' + this.pageindex)
      if (res.status !== 0) {
        Toast('获取商品列表失败')
      }
      // 将旧数据拼接新数据
      this.goodslist = this.goodslist.concat(res.message)
    },
    // 点击获取更多商品
    getMore() {
      this.pageindex++
      this.getGoodsList()
    },
    // 根据Id跳转到商品详情
    goDetail(id) {
      this.$router.push({
        name: 'goodsinfo',
        params: { id }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.goods-list {
  display: flex;
  // 换行
  flex-wrap: wrap;
  padding: 7px;
  justify-content: space-between;
  .goods-item {
    width: 49%;
    border: 1px solid #ccc;
    box-shadow: 0 0 8px #ccc;
    margin: 4px 0;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    min-height: 293px;
    img {
      width: 100%;
    }
    .title {
      font-size: 14px;
    }
    .info {
      background-color: #eee;
      p {
        margin: 0;
        padding: 5px;
      }
      .price {
        .now {
          color: red;
          font-weight: bold;
          font-size: 16px;
        }
        .old {
          text-decoration: line-through;
          font-size: 12px;
          margin-left: 10px;
        }
      }
      .sell {
        display: flex;
        justify-content: space-between;
        font-size: 13px;
      }
    }
  }
}
</style>
