// 限时抢购模块功能
(function(argument) {
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
})();