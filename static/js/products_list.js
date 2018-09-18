$(function() {
	var type = location.search.split('=')[1];
	$.ajax({
		url: 'http://localhost:8080/products_list/',
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

			})
		}
	})


})