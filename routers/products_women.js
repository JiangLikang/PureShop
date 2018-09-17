const express = require('express');
const router = express.Router();
const pool = require('../pool.js');

router.get('/', (req, res) => {
	var wid = req.query.wid,
		sql = 'SELECT * FROM pureshop_product_woman WHERE wid = ?';
	pool.query(sql, [wid], (err, result) => {
		if (err) {
			console.log(err);
		}
		res.send(result);
	})
})



module.exports = router;