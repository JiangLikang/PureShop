$(function() {
	$(function() {
		if (location.search.indexOf('wid=') != -1) {

			var pro = new Promise((open) => {
					$.ajax({
						url: 'http://localhost:8080/products_women/remai',
						type: 'get',
						dataType: 'json',
						success: function(res) {
							new Vue({
								el: "#remai",
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
						url: 'http://localhost:8080/products_women/similar',
						type: 'get',
						dataType: 'json',
						success: function(res) {
							new Vue({
								el: "#similar",
								data: {
									res
								}


							})

						}
					})
				})
				.then((open) => {
					$.ajax({
						url: 'http://localhost:8080/products_women/haixianggou',
						type: 'get',
						dataType: 'json',
						success: function(res) {
							// var haixianggou = res
							new Vue({
								el: "#haixianggou",
								data: {
									res
								}


							})

						}
					})
				})
				.then((open) => {
					var wid = location.search.split('=')[1];
					$.ajax({
						url: 'http://localhost:8080/products_women/details',
						type: 'get',
						dataType: 'json',
						data: {
							wid
						},
						success: function(res) {
							new Vue({
								el: "#details",
								data: {
									res,
									wid: wid,
									content: '',
									list: []
								},
								methods: {
									cmt_send: async function() {
										var res = await axios.post('http://localhost:8080/user/addComments', Qs.stringify({
											wid: this.wid,
											content: this.content
										}))
										if (res.data.ok == -1) {
											alert(res.data.msg)
										} else if (res.data.ok == 0) {
											alert(res.data.msg)
										} else if (res.data.ok == 1) {
											this.content = '';
											this.get_comments_list();
											alert(res.data.msg);
										}
									},
									get_comments_list: async function() {
										var res = await axios.get('http://localhost:8080/user/commentsList?wid=' + this.wid)
										this.list = res.data;
									}
								},
								mounted() {
									this.get_comments_list();
								}
							})
							// 店内搜索
							var $search = $('#inshopSub');
							var $input = $search.prev();
							$search.click(function() {
								location.href = `http://localhost:8080/products_list.html?keyword=${$input.val().trim()}`

							});
							$input.keyup(function(e) {
								if (e.keyCode == 13) {
									$search.click();
								}
							})
							$('#remai a').click(function(e) {
								e.preventDefault();
								$id = $(this).attr('data-id');
								location.href = `http://localhost:8080/products_women.html?wid=${$id}`
							});
							$('#similar a').click(function(e) {
								e.preventDefault();
								$id = $(this).attr('data-id');
								location.href = `http://localhost:8080/products_women.html?wid=${$id}`
							});
							$('#haixianggou a').click(function(e) {
								e.preventDefault();
								$id = $(this).attr('data-id');
								location.href = `http://localhost:8080/products_women.html?wid=${$id}`
							});
							//切换显示的图片
							var $mask = $('#mask');
							$mask.css('background-image', `url(${res[0].lg1})`);
							var $ul = $('.small_pic_ul');
							var $show_img = $('.show_div>img');
							$ul.on('mouseover', 'img', function(event) {
								$('.small_pic_ul img').css({
									'opacity': 0.5,
									'border-bottom-color': '#dee2e6'
								});
								$(this).css({
									'opacity': 1,
									'border-bottom-color': '#EF2F23'
								});
								var md = $(this).attr('data-md');
								$show_img.attr('src', md);
								$mask.css({
									'background': `url(${$(this).attr('data-lg')})`,
									'background-repeat': 'no-repeat'
								});
							});
							//放大镜效果
							var $smask = $('#super-mask');
							$mask.width($smask.width() * 0.376);
							$mask.height($mask.width());
							var mask_size = $('#mask').width();
							$smask.hover(function() {
								$mask.toggleClass('d-none');
							})

							function bigView(argument) {
								$smask.mousemove(function(e) {
									var top = e.offsetY - mask_size / 2;
									var left = e.offsetX - mask_size / 2;
									if (top < 0) {
										top = 0;
									}
									if (left < 0) {
										left = 0;
									}
									$mask.css({
										left,
										top,
										'backgroundPosition': `${-(832/$show_img.width())*left}px ${-(1248/$show_img.height())*top}px `,
										'background-color': '#f5f5f5'
									});

								});

							}
							bigView();
							$(window).resize(function(event) {
								var picWidth = $('.show_div img').width();
								var picHeight = $('.show_div img').height();
								$smask.css('width', picWidth);
								$smask.css('height', picHeight);
								var smk_left = ($('.show_div').width() - picWidth) / 2;
								$smask.css('left', smk_left);

								$mask.width($smask.width() * 0.376);
								$mask.height($mask.width());
								mask_size = $('#mask').width();
								bigView();
							});
							//数量按钮效果
							var $count = $('.count');
							$count.prev().css('color', 'white');
							$count.next().click(function() {
								$count.attr('value', parseInt($count.val()) + 1);
								if ($count.val() < 2) {
									$count.prev().css('color', 'white');
								} else {
									$count.prev().css('color', 'black');
								}
							});
							$count.prev().click(function() {
								if ($count.val() > 1) {
									$count.attr('value', parseInt($count.val()) - 1);
								}
								if ($count.val() < 2) {
									$count.prev().css('color', 'white');
								} else {
									$count.prev().css('color', 'black');
								}
							});
							//颜色选择
							var $color = $('#color>img');
							$color.click(function() {
								$(this).css('border-color', '#EF2F23');
								$(this).siblings().css('border-color', '#dee2e6');
							});
							//尺码选择
							var $size = $('#size li');
							$size.click(function() {
								$(this).css('border-color', '#EF2F23');
								$(this).siblings().css('border-color', 'black');
							});
						},
						error: function(err) {
							console.log(err);
						}

					})
				})


		}

	});


})