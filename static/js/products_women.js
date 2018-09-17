$(function() {
	$(function() {
		if (location.search.indexOf('wid=') != -1) {
			var wid = location.search.split('=')[1];
			$.ajax({
				url: 'http://localhost:8080/products_women/',
				type: 'get',
				dataType: 'json',
				data: {
					wid
				},
				async: false,
				success: function(res) {
					var detail = `<div>
						<h4>${res[0].title}</h4>
					</div>
					<div>
						<p class="text-small text-muted">${res[0].title}
						</p>
					</div>
					<div class="alert alert-secondary ">
						<div>
							<b class="text-small text-muted ">现价：</b><span class="price2 pr-5">￥${res[0].price}</span>
							<span class="d-inline-block text-small">评分：${res[0].score} &nbsp;累积销量：${res[0].sold_count}</span>
						</div>
					</div>
					<div class="text-muted pt-3 mt-3">
						<b class="mr-2">客服:</b><span class="text-small">联系客服</span>
					</div>
					<div class="text-muted pt-3 mt-3 " id="color">						
						<b class="mr-1">颜色:</b>						
						<img src="${res[0].sm1}" alt="" class="color_pic img-thumbnail">
						<img src="${res[0].sm2}" alt="" class="color_pic img-thumbnail">
					</div>
					<div class="d-flex pt-3 mt-3" id="size">
						<b class="text-muted mr-2">尺码:</b>
						<ol class="list-unstyled d-flex" >
							<li class="size_li mr-2">S</li>
							<li class="size_li mr-2">M</li>
							<li class="size_li mr-2">L</li>
						</ol>
						<span class="text-muted text-small pt-2">库存${res[0].stock}件</span>
					</div>
					<div class="d-flex  w-50  pt-3" id="count">
						<b class="text-muted mr-2">数量:</b>
						<button class="count_btn mr-2">-</button>
						<input type="text" class="count mr-2" value="1">
						<button class="count_btn">+</button>
					</div>
					<div class="d-flex mt-3 justify-content-start pt-3">
						<a href="" class="btn btn-danger mr-2" style="background: #EF2F23;">立即购买</a>
						<a href="" class="btn btn-danger mr-2" style="text-align: center;background: #EF2F23;">加入购物车</a>
						<a href="" class="btn btn-danger" style="background: #EF2F23;">收藏</a>
					</div>
					<div class="text-small text-muted pt-3 mt-3">
						<b>服务承诺：</b> 
						<img src="img/products_detail/1.png" alt="" class="products_logo">&nbsp;全国包邮 
						<img src="img/products_detail/2.png" alt="" class="products_logo">&nbsp;7天无忧退货 
						<img src="img/products_detail/3.png" alt="" class="products_logo">&nbsp;72小时发货
						<img src="img/products_detail/4.png" alt="" class="products_logo">&nbsp;退货补运费
					</div>`;
					$('#details').html(detail);
					var pic = `<div id="mask" class="p-absolute d-none"></div>
					<div class="show_div">
						<div id='super-mask' class="p-absolute"></div>
						<img src="${res[0].show_pic}" class="img-fluid  img-thumbnail" alt="">	
					</div>
					<ul class="small_pic_ul d-flex  pt-2 pl-3 justify-content-around">
						<li class="pic_li"><a href=""><img src="${res[0].sm1}" alt="" class="small_pic img-thumbnail" data-md='${res[0].md1}' data-lg='${res[0].lg1}'></a></li>
						<li class="pic_li "><a href=""><img src="${res[0].sm2}" alt="" class="small_pic img-thumbnail" data-md='${res[0].md2}' data-lg='${res[0].lg2}'></a></li>
						<li class="pic_li"><a href="" ><img src="${res[0].sm3}" alt="" class="small_pic img-thumbnail" data-md='${res[0].md3}' data-lg='${res[0].lg3}'></a></li>
						<li class="pic_li"><a href=""><img src="${res[0].sm4}" alt="" class="small_pic img-thumbnail" data-md='${res[0].md4}' data-lg='${res[0].lg4}'></a></li>
						<li class="pic_li"><a href=""><img src="${res[0].sm5}" alt="" class="small_pic img-thumbnail" data-md='${res[0].md5}' data-lg='${res[0].lg5}'></a></li>
					</ul>`;
					$('#pic').html(pic);
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
					var mask_size = $('#mask').width();
					var $smask = $('#super-mask');
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
								'backgroundPosition': `${-2.8*left}px ${-2.8*top}px `,
								'background-color': '#f5f5f5'
							});

						});

					}
					bigView();
					$(window).resize(function(event) {
						mask_size = $('#mask').width();
						bigView();
						var picWidth = $('.show_div img').width();
						var picHeight = $('.show_div img').height();
						$smask.css('width', picWidth);
						$smask.css('height', picHeight);
						var smk_left = ($('.show_div').width() - picWidth) / 2;
						$smask.css('left', smk_left);
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

		}

	});

})