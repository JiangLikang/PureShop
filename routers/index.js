const express = require('express');
const router = express.Router();
const pool = require('../pool.js');

router.get('/spring', (req, res) => {
	var sql = `SELECT * FROM pureshop_product_woman WHERE type='spring'`;
	pool.query(sql, [], (err, result) => {
		if (err) {
			console.log(err)
		}
		res.send(result.slice(-4));
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
	var sql = `SELECT * FROM pureshop_product_woman WHERE type='xianshi'`;
	pool.query(sql, [], (err, result) => {
		if (err) {
			console.log(err)
		}
		res.send(result);
	})
})


module.exports = router;