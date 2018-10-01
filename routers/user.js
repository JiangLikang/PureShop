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
			res.send(`<script>
				alert('亲，信息填写不完整不能注册哦')
				self.location = document.referrer;
				</script>`)
			return;
		}

	}
	if (gender == '男') {
		gender = 1
	} else {
		gender = 0
	}
	var sql0 = 'SELECT * FROM pureshop_user WHERE uname=?';
	pool.query(sql0, uname, (err, result0) => {
		if (err) {
			throw err
		}
		if (result0.length > 0) {
			res.send(
				`<script>
				alert('抱歉，用户已存在 T.T')
				self.location = document.referrer;
				</script>`
			)
			// res.send({
			// 	ok: -1,
			// 	msg: '抱歉，用户已存在 T.T'
			// })
		} else {
			pool.query(sql, [uname, upwd, email, phone, user_name, gender], (err, result) => {
				if (err) {
					throw err;
				}
				if (result.affectedRows > 0) {
					res.send(`<script>
					alert('注册成功！')
					location.href='http://localhost:8080/index.html';
					</script>`);
					// res.send({
					// 	ok: 1,
					// 	msg: '注册成功！'
					// })
				} else {
					res.send(`<script>
					alert('注册异常，出现了未知的错误 T.T')
					self.location = document.referrer;
					</script>`);
					// res.send({
					// 	ok: 0,
					// 	msg: '注册异常，出现了未知的错误 T.T'
					// })
				}

			});
		}
	})
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
				if (result2.length > 0) {
					req.session.uid = result2[0].uid;
					req.session.uname = result2[0].uname;
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
				ok: -1,
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

router.post('/addComments', (req, res) => {
	var wid = req.body.wid;
	var content = req.body.content;
	var progress = 0;
	if (req.session.uid !== undefined) {
		var uname = req.session.uname;
		if (content.length < 2) {
			res.send({
				ok: 0,
				msg: "亲，评论的内容太少了"
			})
			return;
		}
		var sql = 'INSERT INTO `user_comments`(`id`, `wid`, `ctime`, `content`, `uname`, `isdel`) VALUES (NULL,?,now(),?,?,0)';
		pool.query(sql, [wid, content, uname], (err, result) => {
			if (err) {
				throw err;
			}
			if (result.affectedRows == 1) {
				res.send({
					ok: 1,
					msg: '评论成功！'
				})
			} else {
				res.send({
					ok: 0,
					msg: '评论失败了。。。T.T'
				})
			}
		})
	} else {
		res.send({
			ok: -1,
			msg: '亲，您还没有登录哦'
		})
	}
})

router.get('/commentsList', (req, res) => {
	var wid = req.query.wid;
	var sql = 'SELECT * FROM user_comments WHERE wid=?';
	pool.query(sql, [wid], (err, result) => {
		if (err) {
			throw err;
		}
		result.reverse();
		res.send(result);
	})

})

router.get('/addToCart', (req, res) => {
	if (req.session.uid !== undefined) {
		var uid = req.session.uid;
		var {
			wid,
			title,
			img,
			size,
			color,
			count,
			oldP,
			nowP
		} = req.query;
		for (var key in req.query) {
			if (req.query[key] == '') {
				res.send({
					ok: -1,
					msg: '亲，您选择的商品信息不完整哦'
				})
				return;
			}
		}
		var sql = "INSERT INTO pureshop_shoppingcart VALUES(NULL,?,?,?,?,?,?,?,?,?,0)";
		pool.query(sql, [uid, wid, img, title, color, size, oldP, nowP, count], (err, result) => {
			if (err) {
				throw err
			}
			if (result.affectedRows > 0) {
				res.send({
					ok: 1,
					msg: '添加成功！'
				})
			} else {
				res.send({
					ok: 0,
					msg: '添加失败 T.T'
				})
			}
		})

	} else {
		res.send({
			ok: -1,
			msg: '亲，您还没有登录哦'
		})
	}
})
router.get('/getCart', (req, res) => {
	if (req.session.uid !== undefined) {
		var sql = 'SELECT * FROM pureshop_shoppingcart WHERE uid=?'
		var uid = req.session.uid;
		pool.query(sql, [uid], (err, result) => {
			if (err) {
				throw err
			}
			res.send({
				ok: 1,
				msg: result
			})
		})
	} else {
		res.send({
			ok: -1,
			msg: '亲，您还没有登录哦'
		})
	}
})
//导出路由器
module.exports = router;