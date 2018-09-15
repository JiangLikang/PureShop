function user_check() {
	var xhr = create_xhr();
	xhr.onreadystatechange = function() {
		if (xhr.readyState == 4 && xhr.status == 200) {
			var result = xhr.responseText;
			alert(result);
		}
	};
	var uname = $('uname').value;
	var upwd = $('upwd').value;
	xhr.open('post', '/user/login', true);
	xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded'); //必须放在open后面
	xhr.send('uname=' + uname + '&upwd=' + upwd);
}