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
							// sessionStorage.setItem('uid', res.data.session.uid); //设置指定session值
							// sessionStorage.setItem('uname', res.data.session.uname); //设置指定session值
							self.location = document.referrer;
							// location.href = 'http://www.pureshop.applinzi.com';
						}
					})

				} else {
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
				// console.log(res);
			}
		}

	})
})();