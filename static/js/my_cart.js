$(function() {
	new Vue({
		el: "#cart-list",
		data: {
			list: []
		},
		methods: {

		},
		created() {
			(async function(self) {
				var res = await axios.get('http://localhost:8080/user/getCart')
				self.list = res.data.msg;
				console.log(res);
				console.log(self.list);
			})(this);
		}


	})

})