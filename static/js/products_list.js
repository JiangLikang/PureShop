$(function() {
	new Promise((open) => {
			if (location.search.indexOf('type') != -1) {
				var type = location.search.split('=')[1];
				$.ajax({
					url: 'http://localhost:8080/products_list/season',
					type: 'get',
					dataType: 'json',
					data: {
						type
					},
					success: function(res) {
						new Vue({
							el: "#pros",
							data: {
								res
							}
						});
						$('#pros a').click(function(e) {
							e.preventDefault();
							$id = $(this).attr('data-id');
							location.href = `http://localhost:8080/products_women.html?wid=${$id}`;
						});
					}
				})
			}
			open();
		})
		.then((open) => {
			if (location.search.indexOf('keyword') != -1) {
				var keyword = decodeURI(location.search.split('=')[1]);
				$.ajax({
					url: 'http://localhost:8080/products_list/search',
					type: 'get',
					dataType: 'json',
					data: {
						keyword
					},
					success: function(res) {
						new Vue({
							el: "#pros",
							data: {
								res
							}
						});
						$('#pros a').click(function(e) {
							e.preventDefault();
							$id = $(this).attr('data-id');
							location.href = `http://localhost:8080/products_women.html?wid=${$id}`;
						});
					}
				})

			}

		})

})