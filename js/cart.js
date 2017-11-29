new Vue({
  el: '#app',
  data: {
    totalMoney: 0,
    productList: [],
    checkAllFlag: false,
    delFlag: false,
    curProduct: ''
  },
  // 局部过滤器
  filters: {
    formatMoney: function(value) {
      return "¥ "+value.toFixed(2)
    }
  },
  // 实例化之后执行
  mounted: function() {
    this.$nextTick(function() {
      this.cartView()
    })
  },
  methods: {
    cartView: function() {
      this.$http.get("data/cartData.json").then(res=>{
        //console.log(res.data.status);
         this.productList = res.data.result.list
      })
    },
    changeMoney: function(product, way) {
      if(way > 0) {
        product.productQuantity++
      } else {
        product.productQuantity--
        if(product.productQuantity < 1) {
          product.productQuantity = 1
        }
      }
      this.calcTotalMoney()
    },
    selectProduct: function(product) {
      if(typeof product.checked == "undefined") {
        // Vue.set(product, "checked", true) // 全局注册
        this.$set(product, "checked", true) // 局部注册
      } else {
        product.checked = !product.checked
      }
      this.calcTotalMoney()
    },
    checkAll: function(flag) {
      this.checkAllFlag = flag
      var _this = this
      this.productList.forEach(function(product, index) {
        if(typeof product.checked == "undefined") {
          // Vue.set(product, "checked", true) // 全局注册
          _this.$set(product, "checked", _this.checkAllFlag) // 局部注册
        } else {
          product.checked = _this.checkAllFlag
        }
      })
      this.calcTotalMoney()
    },
    calcTotalMoney: function() {
      var _this = this
      this.totalMoney = 0
      this.productList.forEach(function(item, index) {
        if(item.checked) {
          _this.totalMoney += item.productPrice * item.productQuantity
        }
      })
    },
    delConfirm: function(item) {
      this.delFlag = true
      this.curProduct = item
    },
    delProduct: function() {
      var index = this.productList.indexOf(this.curProduct)
      this.productList.splice(index, 1)
      this.delFlag = false
    }
  }
})

// 全局过滤器
Vue.filter("money", function(value,type) {
  return value.toFixed(2) + type
})
