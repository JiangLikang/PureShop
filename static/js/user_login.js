// function user_check() {
// 	var xhr = create_xhr();
// 	xhr.onreadystatechange = function() {
// 		if (xhr.readyState == 4 && xhr.status == 200) {
// 			var result = xhr.responseText;
// 			alert(result);
// 		}
// 	};
// 	var uname = $('uname').value;
// 	var upwd = $('upwd').value;
// 	xhr.open('post', '/user/login', true);
// 	xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded'); //必须放在open后面
// 	xhr.send('uname=' + uname + '&upwd=' + upwd);
// }
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
				var res = await axios.post('http://localhost:8080/user/login', Qs.stringify({
					uname: this.uname,
					upwd: this.upwd
				}));
				if (res.data.ok == 1) {
					alert(res.data.msg);
					location.href = 'http://localhost:8080/index.html';
				} else {
					alert(res.data.msg);
				}

			}
		}

	})
})();