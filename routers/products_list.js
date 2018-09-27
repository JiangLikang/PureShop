const express = require('express');
const pool = require('../pool.js'); //导入连接数据库的模块
//路由器
var router = express.Router();

router.get('/season', (req, res) => {
	var type = req.query.type;
	var pno = req.query.pno;
	if (!pno) {
		pno = 1;
	}
	var pageSize = 12;
	var offset = parseInt((pno - 1) * pageSize);
	var obj = {

	};
	var progress = 0;

	var sql = 'SELECT * FROM pureshop_product_woman WHERE type = ? LIMIT ?,?';
	pool.query(sql, [type, offset, pageSize], (err, result) => {
		if (err) {
			console.log(err)
		}
		obj.pros = result;
		progress += 50;
		if (progress == 100) {
			res.send(obj);
		}
	})
	var sql = 'SELECT count(wid) as c FROM pureshop_product_woman WHERE type=?';
	pool.query(sql, [type], (err, result) => {
		if (err) {
			throw err;
		}
		obj.pageCount = Math.ceil(result[0].c / pageSize);
		progress += 50;
		if (progress == 100) {
			res.send(obj);
		}
	})
})

router.get('/search', (req, res) => {
	var keyword = req.query.keyword;
	var pno = req.query.pno;
	if (!pno) {
		pno = 1;
	}
	var pageSize = 12;
	var offset = parseInt((pno - 1) * pageSize);
	var obj = {

	};
	var progress = 0;
	var sql = `SELECT * FROM pureshop_product_woman WHERE title LIKE '%${keyword}%' LIMIT ?,?`;
	pool.query(sql, [offset, pageSize], (err, result) => {
		if (err) {
			console.log(err)
		}
		obj.pros = result;
		progress += 50;
		if (progress == 100) {
			res.send(obj);
		}
	})
	var sql = `SELECT count(wid) as c FROM pureshop_product_woman WHERE title LIKE '%${keyword}%'`;
	pool.query(sql, [], (err, result) => {
		if (err) {
			throw err;
		}
		obj.pageCount = Math.ceil(result[0].c / pageSize);
		progress += 50;
		if (progress == 100) {
			res.send(obj);
		}
	})
})



module.exports = router;