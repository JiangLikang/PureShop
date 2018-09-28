const express = require('express');
const pool = require('../pool.js'); //导入连接数据库的模块
//路由器
var router = express.Router();
//添加请求方法为post,url为add的路由
//用户注册
router.post('/register', (req, res) => {
	var obj = req.body;
	var sql = 'INSERT INTO pureshop_user (uname,upwd,email,phone,user_name,gender) VALUES(?,md5(?),?,?,?,?)';
	var {
		uname,
		upwd,
		user_name,
		gender,
		email,
		phone
	} = obj;
	for (var key in obj) {
		if (obj[key] == '') {
			res.send('信息不能有空缺！')
			return;
		}

	}
	if (gender == '男') {
		gender = 1
	} else {
		gender = 0
	}
	pool.query(sql, [uname, upwd, email, phone, user_name, gender], (err, result) => {
		if (err) {
			throw err;
		}
		if (result.affectedRows > 0) {
			res.send(`<script>alert('注册成功');location.href='http://localhost:8080/user_login.html'</script>`);
		} else {
			res.send('注册异常');
		}

	});
});

//用户登录
router.post('/login', (req, res) => {
	var {
		uname,
		upwd
	} = req.body;
	var sql = 'SELECT * FROM pureshop_user WHERE uname=?';
	var sql2 = 'SELECT * FROM pureshop_user WHERE upwd=md5(?)';
	pool.query(sql, uname, (err, result) => {
		if (err) {
			throw err;
		}
		if (result.length > 0) {
			pool.query(sql2, upwd, (err, result2) => {
				if (err) {
					throw err;
				}
				if (result.length > 0) {
					req.session.uid = result[0].uid;
					// res.send(`<script>alert('登录成功！');location.href='http://localhost:8080/index.html?user=${result2[0].uname}'</script>`);
					res.send({
						ok: 1,
						msg: '登录成功！'
					})
				} else {
					res.send({
						ok: 0,
						msg: '密码错误'
					});
				}
			});

		} else {
			res.send({
				ok: 0,
				msg: '用户名不存在'
			});
		}
	});
});

router.get('/isLogin', (req, res) => {
	if (req.session.uid !== undefined) {
		var uid = req.session.uid;
		var sql = 'SELECT * FROM pureshop_user WHERE uid=?';
		pool.query(sql, [uid], (err, result) => {
			if (err) throw err;
			res.send({
				ok: 1,
				uname: result[0].uname
			})
		})
	} else {
		res.send({
			ok: 0
		})
	}
})

router.get('/signout', (req, res) => {
	req.session.uid = undefined;
	res.send();
})
//导出路由器
module.exports = router;