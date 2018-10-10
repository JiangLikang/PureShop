$(function() {
	new Vue({
		el: "#cart-list",
		data: {
			list: [],
			total: 0,
			uid: ''
		},
		methods: {
			getCartList: async function() {
				this.uid = sessionStorage.uid;
				if (sessionStorage.length == 0) {
					swal({
						title: "",
						text: '亲，您还未登录哦',
						icon: "error",
						button: {
							text: "确定",
							value: true
						}
					})
				} else {
					axios.defaults.withCredentials = true;
					var res = await axios.get('http://pureshop.applinzi.com/user/getCart', {
						params: {
							uid: this.uid
						}
					})
					if (res.data.ok == 1) {
						this.list = res.data.msg;
						this.total = this.getSubTotal(this.list);
					} else {
						swal({
							text: res.data.msg,
							button: {
								text: '确定'
							}
						})
					}
				}

			},
			getSubTotal: function(list) {
				var sum = 0;
				for (var item of list) {

					sum += item.nowP * item.count;
				}
				return sum;
			},
			count_up(i) {
				this.list[i].count++;
				this.total = this.getSubTotal(this.list);
			},
			count_down(i) {
				if (this.list[i].count > 1) {
					this.list[i].count--;
				}
				this.total = this.getSubTotal(this.list);
			},
			del_item: async function(cid) {
				axios.defaults.withCredentials = true;
				var res = await axios.get('http://pureshop.applinzi.com/user/delCartItem', {
					params: {
						cid: cid,
						uid: this.uid
					}
				})
				if (res.data.ok == 1) {

					this.list = [];
					this.getCartList();
				} else {
					swal({
						text: res.data.msg,
						icon: 'error',
						button: {
							text: '确定'
						}
					})
				}

			},
			go_detail(wid) {
				location.href = 'http://pureshop.applinzi.com/products_women.html?wid=' + wid
			}
		},
		created() {
			// (async function(self) {

			// })(this);
			this.getCartList();
		},



	})

})