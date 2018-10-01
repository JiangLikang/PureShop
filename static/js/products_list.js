$(function() {
	// 解析URL
	function parseObject(url) {    
		var obj = {};    
		if (url.indexOf('?') !== -1) {     
			var url = url.substring(url.indexOf('?') + 1);    
		} else {     
			return;    
		}    
		var arr = url.split('&');    
		arr.forEach(function(val) {     
			var brr = val.split('=');     
			obj[brr[0]] = brr[1];    
		});    
		return obj;   
	}
	var obj = parseObject(window.location.search);
	var {
		type,
		pno,
		keyword
	} = obj;
	keyword = decodeURI(keyword);
	//修改URL
	function changeURLArg(url, arg, arg_val) {
		var pattern = arg + '=([^&]*)';
		var replaceText = arg + '=' + arg_val;
		if (url.match(pattern)) {
			var tmp = '/(' + arg + '=)([^&]*)/gi';
			tmp = url.replace(eval(tmp), replaceText);
			return tmp;
		} else {
			if (url.match('[\?]')) {
				return url + '&' + replaceText;
			} else {
				return url + '?' + replaceText;
			}
		}
		return url + '\n' + arg + '\n' + arg_val;
	}

	// console.log(changeURLArg('http://www.daimajiayuan.com/test.php?class_id=3&id=2', 'class_id', 4));

	new Vue({
		el: "#pros",
		data: {
			cur: pno, //当前页
			res: [],
			pageCount: ''
		},
		created() {
			(async function(self) {
				if (location.search.indexOf('type') != -1) {
					var res = await axios.get('http://localhost:8080/products_list/season', {
						params: {
							type: `${type}`,
							pno: `${pno}`
						}
					});
				} else if (location.search.indexOf('keyword') != -1) {
					var res = await axios.get('http://localhost:8080/products_list/search', {
						params: {
							keyword: `${keyword}`,
							pno: `${pno}`
						}
					})
				}
				if (res.data.ok == 1) {
					self.res = res.data.pros;
					self.pageCount = res.data.pageCount;
				} else {
					// alert('搜索关键词不能为空。。。。T.T')
					swal(
						'',
						'搜索关键词不能为空。。。。T.T',
						'error'
					);
					self.location = document.referrer;
				}
			})(this);
		},
		methods: {
			item_click: function(id) {
				window.open(`http://localhost:8080/products_women.html?wid=${id}`);
			},
			page_click: function(n) {
				if (n != this.cur) {
					this.cur = n
				}
				location.href = changeURLArg(location.href, 'pno', n);
			},
			pre_click: function() {
				if (this.cur > 1) {
					this.cur--;
				} else {
					return;
				}
				location.href = changeURLArg(location.href, 'pno', this.cur);
			},
			nex_click: function() {
				if (this.cur < this.pageCount) {
					this.cur++;
				} else {
					return;
				}
				location.href = changeURLArg(location.href, 'pno', this.cur);
			}

		}

	});
})