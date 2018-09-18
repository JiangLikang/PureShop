const express = require('express');
const router = express.Router();
const pool = require('../pool.js');

router.get('/details', (req, res) => {
	var wid = req.query.wid,
		sql = 'SELECT * FROM pureshop_product_woman WHERE wid = ?';
	pool.query(sql, [wid], (err, result) => {
		if (err) {
			console.log(err);
		}
		res.send(result);
	})
})

router.get('/remai', (req, res) => {
	var sql = `SELECT * FROM pureshop_product_woman WHERE type='remai'`
	pool.query(sql, [], (err, result) => {
		if (err) {
			console.log(err);
		}
		res.send(result);
	})
})

router.get('/similar', (req, res) => {
	var sql = `SELECT * FROM pureshop_product_woman WHERE type='similar'`
	pool.query(sql, [], (err, result) => {
		if (err) {
			console.log(err);
		}
		res.send(result);
	})
})

router.get('/haixianggou', (req, res) => {
	var sql = `SELECT * FROM pureshop_product_woman WHERE type='haixianggou'`
	pool.query(sql, [], (err, result) => {
		if (err) {
			console.log(err);
		}
		res.send(result);
	})
})


module.exports = router;