$(function() {
	//切换显示的图片
	$mask = $('#mask')
	var $ul = $('.small_pic_ul');
	var $show_img = $('.show_div>img');
	$ul.on('mouseover', 'img', function(event) {
		var md = $(this).attr('data-md');
		$show_img.attr('src', md);
		$mask.css('background', `url(${$(this).attr('data-lg')})`);
	});
	//放大镜效果
	var mask_size = 176;
	var $show_div = $('.show_div')
	var $smask = $('#super-mask')
	var max_width = $smask.prop('width') - mask_size;
	var max_height = $smask.prop('height') - mask_size;
	$smask.hover(function() {
		$mask.toggleClass('d-none');
	}).mousemove(function(e) {
		var top = e.offsetY - mask_size / 2;
		var left = e.offsetX - mask_size / 2;
		if (top < 0) {
			top = 0;
		} else if (top > max_height) {
			top = max_height;
		}
		if (left < 0) {
			left = 0;
		} else if (left > max_width) {
			left = max_width;
		}
		$mask.css({
			left,
			top,
			'backgroundPosition': `${-2*left}px ${-2*top}px `
		});

	});
})