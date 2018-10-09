$(function() {
	var pro = new Promise((open) => {
			$.ajax({
			url: 'http://pureshop.applinzi.com/index/spring',
				type: 'get',
				dataType: 'json',
				success: function(res) {
					new Vue({
						el: "#spring",
						data: {
							res
						}


					})


					open();
				}
			})
		})
		.then((open) => {
			$.ajax({
				url: 'http://pureshop.applinzi.com/index/summer',
				type: 'get',
				dataType: 'json',
				success: function(res) {
					new Vue({
						el: "#summer",
						data: {
							res
						}


					})

				}
			})
		})
		.then((open) => {
			$.ajax({
				url: 'http://pureshop.applinzi.com/index/autumn',
				type: 'get',
				dataType: 'json',
				success: function(res) {
					new Vue({
						el: "#autumn",
						data: {
							res
						}


					})

				}
			})
		})
		.then((open) => {
			$.ajax({
				url: 'http://pureshop.applinzi.com/index/winter',
				type: 'get',
				dataType: 'json',
				success: function(res) {
					new Vue({
						el: "#winter",
						data: {
							res
						}


					})

				}
			})
		})
		.then((open) => {
			//判断当下季节
			var time = new Date();
			var month = parseInt(time.getMonth() + 1);
			var season = '';
			if (month > 2 && month < 6) {
				season = 'spring';
			} else if (month > 5 && month < 9) {
				season = 'summer';
			} else if (month > 8 && month < 12) {
				season = 'autumn';
			} else {
				season = 'winter';
			}
			$.ajax({
				url: 'http://pureshop.applinzi.com/index/xianshi',
				type: 'get',
				data: {
					season
				},
				dataType: 'json',
				success: function(res) {
					new Vue({
						el: "#xianshi",
						data: {
							res
						}


					})
					$('.mid_content:not(first-child) a').click(function(e) {
						e.preventDefault();
						$id = $(this).attr('data-id');
						// if (location.search.indexOf('user=' != -1)) {
						// 	var user = location.search.split('=')[1];
						// 	location.href = `http://202.108.35.250:5050/products_women.html?user=${user}&wid=${$id}`
						// } else {
						location.href = `products_women.html?wid=${$id}`
						// 	window.event.returnValue = false;
						// }

					});
				}
			})
		})

	// 限时抢购模块功能
	//计时函数
	function task() {
		var end = new Date("2019/09/7 10:31:00");
		var now = new Date();
		var s = parseInt((end - now) / 1000);
		if (s > 0) {
			var d = parseInt(s / 3600 / 24);
			if (d < 10) d = "0" + d;
			var h = parseInt(s % (3600 * 24) / 3600);
			if (h < 10) h = "0" + h;
			var m = parseInt(s % 3600 / 60);
			if (m < 10) m = "0" + m;
			s %= 60;
			if (s < 10) s = "0" + s;
			var span = document.getElementById("time");
			span.innerHTML = d + "天" + h + "小时" + m + "分" + s + "秒";
		} else {
			clearInterval(time);
			time = null;
			var span = document.getElementById('time');
			span.innerHTML = '优惠活动结束!';
		}
	}
	//防止第一秒跳帧
	task();
	var time = setInterval(task, 1000);
})