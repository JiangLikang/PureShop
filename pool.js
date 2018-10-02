const mysql = require('mysql');
//连接mysql数据库的模块
var pool = mysql.createPool({
	host: 'w.rdc.sae.sina.com.cn',
	user: 'root',
	passward: '123456',
	database: 'app_pureshop',
});
//导出连接数据库
module.exports = pool;