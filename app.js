//引入项目所需的包
//使用express来构建服务器
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const user = require('./routers/user.js');
const products_women = require('./routers/products_women');
const index = require('./routers/index');
const products_list = require('./routers/products_list');

var app = express();
app.all('*', function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "http://www.pureshop.applinzi.com");
	res.header('Access-Control-Allow-Headers', 'Content-type');
	res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS,PATCH");
	res.header('Access-Control-Max-Age', 1728000); //预请求缓存20天
	res.header('Access-Control-Allow-Credentials', true);
	next();
});
app.listen(5050, '0.0.0.0');
//托管静态资源
app.use(express.static('./static'));
app.use(cookieParser());
app.use(session({
	secret: '12345',
	resave: false,
	cookie: {
		maxAge: 60000
	},
	saveUninitialized: true
}))
//配置body-parser
app.use(bodyParser.urlencoded({
	extended: false
}));

//使用路由器来管理所有用户模块下的路由
//挂载到user下 
app.use('/user', user);
app.use('/products_women', products_women);
app.use('/index', index);
app.use('/products_list', products_list);