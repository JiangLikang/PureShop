$(function() {
	//切换显示的图片
	$mask = $('#mask')
	var $ul = $('.small_pic_ul');
	var $show_img = $('.show_div>img');
	$ul.on('mouseover', 'img', function(event) {
		var md = $(this).attr('data-md');
		$show_img.attr('src', md);
		$mask.css({
			'background': `url(${$(this).attr('data-lg')})`,
			'background-repeat': 'no-repeat'
		});
	});
	//放大镜效果
	var mask_size = $('#mask').width();
	var $show_div = $('.show_div')
	var $smask = $('#super-mask')
	$smask.hover(function() {
		$mask.toggleClass('d-none');
	}).mousemove(function(e) {
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
			'backgroundPosition': `${-2*left}px ${-2*top}px `
		});

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
})