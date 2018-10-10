$(function() {
	$(`<link rel='stylesheet' href='../css/header.css'>`).appendTo('head');
	$.ajax({
		url: 'header.html',
		type: 'get',
		success: function(res) {
			$(res).replaceAll('#header')
			// 导航栏传参
			$('.header_body a:not(.nav_active)').click(function(e) {
				e.preventDefault();
				$type = $(this).attr('data-type');
				location.href = `http://pureshop.applinzi.com/products_list.html?type=${$type}&pno=1`
			});
			//搜索传参
			var $search = $('#sub');
			var $input = $search.prev();
			$search.click(function() {
				location.href = `http://pureshop.applinzi.com/products_list.html?keyword=${$input.val().trim()}&pno=1`

			});
			$input.keyup(function(e) {
				if (e.keyCode == 13) {
					$search.click();
				}
			})
			new Vue({
				el: '#login',
				data() {
					return {
						isLogin: false,
						uname: ''
					}
				},
				mounted() {
					// (async function(self) {
					// 	axios.defaults.withCredentials = true;
					// 	var res = await axios.get("http://pureshop.applinzi.com/user/islogin");
					// 	if (res.data.ok == 1) {
					// 		self.isLogin = true;
					// 		self.uname = res.data.uname;
					// 	} else {
					// 		self.isLogin = false;
					// 	}
					// })(this);
					if (sessionStorage.length > 0) {
						this.uname = sessionStorage.uname;
						this.isLogin = true;
					}

				},
				methods: {
					signout: function() {
						// axios.defaults.withCredentials = true;
						// var res = await axios.get("http://pureshop.applinzi.com/user/signout");
						sessionStorage = {};
						location.href = 'http://pureshop.applinzi.com/index.html';

					}
				}
			})

		}
	})

})