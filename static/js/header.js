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
				location.href = `http://localhost:8080/products_list.html?type=${$type}`
			});
			//搜索传参
			$search = $('#sub');
			$input = $search.prev();
			$search.click(function() {
				location.href = `http://localhost:8080/products_list.html?keyword=${$input.val().trim()}`

			});
			$input.keyup(function(e) {
				if (e.keyCode == 13) {
					$search.click();
				}
			})

		}
	})

})