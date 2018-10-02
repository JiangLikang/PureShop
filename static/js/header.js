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
				location.href = `http://localhost:5050/products_list.html?type=${$type}&pno=1`
			});
			//搜索传参
			var $search = $('#sub');
			var $input = $search.prev();
			$search.click(function() {
				location.href = `http://localhost:5050/products_list.html?keyword=${$input.val().trim()}&pno=1`

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
					(async function(self) {
						var res = await axios.get("http://localhost:5050/user/islogin");
						if (res.data.ok == 1) {
							self.isLogin = true;
							self.uname = res.data.uname;
						} else {
							self.isLogin = false;
						}
					})(this);

				},
				methods: {
					signout: async function() {

						var res = await axios.get("http://localhost:5050/user/signout");
						location.href = 'http://localhost:5050/index.html';

					}
				}
			})

		}
	})

})