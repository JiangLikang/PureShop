$(function() {
	// 正则格式检查
	function vali(selector, reg, msg, e) {
		var $txt = $(selector);
		if (reg.test($txt.val())) {
			$txt.next().html('<img src="img/user_register/ok.png">验证通过！');
		} else {
			$txt.next().html(`<img src="img/user_register/err.png">${msg}`);
			e.preventDefault();
		}
	}

	var form = document.forms[0];
	form.uname.onblur = function(e) {
		vali(this, /^\w{3,9}$/, '用户名必须介于3-9位之间', e);
	}

	form.user_name.onblur = function(e) {
		vali(this, /([0-9\u4e00-\u9fa5]|\w){2,9}/, '昵称必须介于2-9个字符之间', e);
	}
	form.gender.onblur = function(e) {
		vali(this, /^(男|女)$/, '格式错误', e);
	}
	form.upwd.onblur = function(e) {
		vali(this, /^\w{6,8}$/, '密码必须介于6-8位之间', e);
	}
	form.check_upwd.onblur = function(e) {
		var pwd = form.upwd.value;
		if (this.value != pwd || this.value == '') {
			$(this).next().html(`<img src="img/user_register/err.png">密码不一致`);
		} else {
			$(this).next().html('<img src="img/user_register/ok.png">验证通过！');
		}
	}
	form.email.onblur = function(e) {
		vali(this, /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/, '邮箱格式错误', e);
	}
	form.phone.onblur = function(e) {
		vali(this, /^1[34578]\d{9}$/, '手机号码格式错误', e);
	}
	//同意条款
	$('#sub').click(function(e) {
		var isChecked = $('.checkbox').prop('checked');
		if (isChecked == false) {
			e.preventDefault();
			swal({
				title: "",
				text: "亲，必须同意条款哦！",
				icon: "error",
				button: {
					text: "确定",
					value: true
				}
			})
		}
	});
	// new Vue({
	// 	el: "#form",
	// 	data: {
	// 		uname: '',
	// 		upwd: '',
	// 		email: '',
	// 		phone: '',
	// 		user_name: '',
	// 		gender: ''
	// 	},
	// 	methods: {
	// 		send_form: async function() {
	// 			var res = axios.post('http://pureshop.applinzi.com/user/register', Qs.stringify({
	// 				uname: this.uname,
	// 				upwd: this.upwd,
	// 				email: this.email,
	// 				phone: this.phone,
	// 				user_name: this.user_name,
	// 				gender: this.gender
	// 			})).then((res) => {
	// 				if (res.data.ok == 1) {
	// 					swal({
	// 						title: "",
	// 						text: "注册成功！",
	// 						icon: "success",
	// 						button: {
	// 							text: "确定",
	// 							value: true
	// 						}
	// 					}).then(function(value) {
	// 						if (value) {

	// 							self.location = document.referrer;
	// 						}
	// 					})
	// 				} else {
	// 					swal(
	// 						'',
	// 						res.data.msg,
	// 						'error'
	// 					);
	// 				}
	// 			})
	// 		}
	// 	}

	// })

})