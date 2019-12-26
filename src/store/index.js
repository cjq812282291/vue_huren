import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// 在从本地存储中的 购物车的数据读取出来 放入 store 中
var car = JSON.parse(localStorage.getItem('car' || '[]'))

export default new Vuex.Store({
    // this.$store.state.***
    // 相当于data属性 要存入的数据
    state: {
        // 购物车的商品数据 存入一个数组
        // { id: 商品的id count: 要购买的数量 price: 商品的单价 selected: false }
        car
    },
    // // this.$store.commit('方法的名称', '按需传递唯一的参数')
    // // 相当于 methods
    mutations: {
        // 点击 加入购物车 保存到 store.car
        addToCar(state, goodsinfo) {
            // 1. 如果购物车 之前就有这个对应的商品了 只需更新数量
            // 2. 没有则直接吧商品数据 push 到 car 中
            // 假设 在购物车中 没有找到对应的商品
            var flag = false
            // // some() 方法用于检测数组中的元素是否满足指定条件（函数提供）。
            // // some() 方法会依次执行数组的每个元素 满足条件则返回 true 否则 false
            state.car.some(item => {
                if (item.id === goodsinfo.id) {
                    item.count += parseInt(goodsinfo.count)
                    flag = true
                }
            })
            // // 如果最终 循环完毕 得到的 flag 还是 false
            // // 则把商品数据直接 push 到 购物车中
            if (!flag) {
                state.car.push(goodsinfo)
            }

            // 当更新 car 之后 把 car 数组 存储到本地的 localStorage 中
            localStorage.setItem('car', JSON.stringify(state.car))
        }
    },
    // this.$store.getters.***
    // 相当于计算属性  相当于filters
    getters: {
        // 计算全部的数值
        getAllCount(state) {
            var c = 0
            state.car.forEach(item => {
                c += item.count
            })
            return c
        },
        getGoodsCount(state) {
            var o = {}
            state.car.forEach(item => {
                o[item.id] = item.count
            })
            return o
        },
        // 选中的值
        getGoodsSelected(state) {
            var o = {}
            state.car.forEach(item => {
                o[item.id] = item.selected
            })
            return o
        },
        // 计算购物车选中商品的总价
        getGoodsCountAmount(state) {
            var o = {
                // 勾选的数量
                count: 0,
                // 总价
                amount: 0
            }
            state.car.forEach(item => {
                if (item.selected) {
                    o.count += item.count
                    o.amount += item.price * item.count
                }
            })
            return o
        }
    },
    actions: {

    },
    modules: {

    }
})
