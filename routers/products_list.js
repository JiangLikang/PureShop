const express = require('express');
const pool = require('../pool.js'); //导入连接数据库的模块
//路由器
var router = express.Router();

router.get('/', (req, res) => {
	var type = req.query.type;
	var sql = 'SELECT * FROM pureshop_product_woman WHERE type = ?';
	pool.query(sql, [type], (err, result) => {
		if (err) {
			console.log(err)
		}
		res.send(result);
	})
})



module.exports = router;