new Vue({
  el: '.container',
  data: {
    addressList: [],
    limitNumber: 3,
    currentIndex: 0,
    shippingMethod: 1
  },
  mounted: function() {
    var _this = this
    this.$nextTick(function() {
      _this.getAddressList()
    })
  },
  computed: {
    filterAddressList: function() {
      return this.addressList.slice(0, this.limitNumber)
    }
  },
  methods: {
    getAddressList: function() {
      var _this = this
      this.$http.get("data/address.json").then(function(response) {
        // console.log(response);
        var data = response.data
        if(data.status == '0') {
          _this.addressList = data.result
        }
      })
    },
    setDefault: function(addressId) {
      this.addressList.forEach(function(address, index) {
        if(address.addressId == addressId) {
          address.isDefault = true
        } else {
          address.isDefault = false
        }
      })
    }
  }
})
