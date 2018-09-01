//引入项目所需的包
//使用express来构建服务器
const express=require('express');
const bodyParser=require('body-parser');
const user=require('./routers/user.js');

var app=express();
app.listen(3000);
 
//托管静态资源
app.use(express.static('./static'));

//配置body-parser
app.use(bodyParser.urlencoded({
	extended: false
}));

//使用路由器来管理所有用户模块下的路由
//挂载到user下 
app.use('/user',user);
