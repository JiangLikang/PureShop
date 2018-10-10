$(function() {
	new Vue({
		el: "#cart-list",
		data: {
			list: [],
			total: 0
		},
		methods: {
			getCartList: async function() {
				axios.defaults.withCredentials = true;
				var res = await axios.get('http://pureshop.applinzi.com/user/getCart')
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
				// swal({
				// 	text: '亲，确定要删除这条商品吗',
				// 	buttons: {
				// 		button1: {
				// 			text: '确定',
				// 			value: true
				// 		},
				// 		button2: {
				// 			text: '我再考虑下',
				// 			value: false
				// 		}
				// 	}
				// }).then(async function(value) {
				// if (value) {
				axios.defaults.withCredentials = true;
				var res = await axios.get('http://pureshop.applinzi.com/user/delCartItem', {
					params: {
						cid: cid
					}
				}) //.then(function(res) {
				if (res.data.ok == 1) {
					// swal({
					// 	text: res.data.msg,
					// 	icon: 'success',
					// 	button: {
					// 		text: '确定'
					// 	}
					// })
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
				// })



				// } else {

				// }
				// })

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