const mysql = require('mysql');
//连接mysql数据库的模块
var pool = mysql.createPool({
	host: 'pureshop.applinzi.com',
	port: 3306,
	user: 'mjz1ylm53w',
	passward: 'j3k5zx20wmx42l4iw30w023zmj4jyk0mzll40lw0',
	database: 'app_pureshop',
});
//导出连接数据库
module.exports = pool;