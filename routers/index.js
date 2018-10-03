const express = require('express');
const router = express.Router();
const pool = require('../pool.js');

router.get('/spring', (req, res) => {
	var callback = req.query.callback;
	var sql = `SELECT * FROM pureshop_product_woman WHERE type='spring'`;
	pool.query(sql, [], (err, result) => {
		if (err) {
			console.log(err)
		}
		if (callback) {
			res.type('text/javascript');
			res.send(callback + '(' + result.slice(-4) + ')');
		}


	})
})

router.get('/summer', (req, res) => {
	var sql = `SELECT * FROM pureshop_product_woman WHERE type='summer'`;
	pool.query(sql, [], (err, result) => {
		if (err) {
			console.log(err)
		}
		res.send(result.slice(-4));
	})
})

router.get('/autumn', (req, res) => {
	var sql = `SELECT * FROM pureshop_product_woman WHERE type='autumn'`;
	pool.query(sql, [], (err, result) => {
		if (err) {
			console.log(err)
		}
		res.send(result.slice(-4));
	})
})

router.get('/winter', (req, res) => {
	var sql = `SELECT * FROM pureshop_product_woman WHERE type='winter'`;
	pool.query(sql, [], (err, result) => {
		if (err) {
			console.log(err)
		}
		res.send(result.slice(-4));
	})
})

router.get('/xianshi', (req, res) => {
	var season = req.query.season;
	var sql = `SELECT * FROM pureshop_product_woman WHERE type=?`;
	pool.query(sql, [season], (err, result) => {
		if (err) {
			console.log(err)
		}
		res.send(result.slice(-5));
	})
})


module.exports = router;