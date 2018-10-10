(function() {
	new Vue({
		el: "#login",
		data() {
			return {
				uname: '',
				upwd: ''
			}
		},
		methods: {
			login: async function() {
				// var params = new URLSearchParams();
				// params.append('uname', this.uname);
				// params.append('upwd', this.upwd);
				var res = await axios.post('http://pureshop.applinzi.com/user/login', Qs.stringify({
					uname: this.uname,
					upwd: this.upwd
				}));
				if (res.data.ok == 1) {
					// alert(res.data.msg);
					// location.href = 'http://localhost:8080/index.html';
					swal({
						title: "",
						text: "登录成功！",
						icon: "success",
						button: {
							text: "确定",
							value: true
						}
					}).then(function(value) {
						if (value) {

							self.location = document.referrer;
						}
					})

				} else {
					// alert(res.data.msg);
					swal({
						title: "",
						text: res.data.msg,
						icon: "error",
						button: {
							text: "确定",
							value: true
						}
					})
				}

			}
		}

	})
})();