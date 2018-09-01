const express=require('express');
const pool=require('../pool.js');//导入连接数据库的模块
//路由器
var router=express.Router();
//添加请求方法为post,url为add的路由
//用户注册
router.post('/register',(req,res)=>{
	var obj=req.body;
	var sql='insert into pureshop_user (uname,upwd,email,phone,user_name,gender) values(?,?,?,?,?,?)';
	var uname=obj.uname;
	if (!uname) {
		res.send(`<script>alert('用户不能为空');location.href='http://localhost:3000/04-register.html'</script>`);
		return;
	}
	var upwd=obj.upwd;
	if (!upwd) {
		res.send(`<script>alert('密码不能为空');location.href='http://localhost:3000/04-register.html'</script>`);
		return;
	}
	var email=obj.email;
	if (!email) {
		res.send(`<script>alert('邮箱不能为空');location.href='http://localhost:3000/04-register.html'</script>`);
		return;
	}
	var phone=obj.phone;
	if (!phone) {
		res.send(`<script>alert('电话不能为空');location.href='http://localhost:3000/04-register.html'</script>`);
		return;
	}
	var user_name=obj.user_name;
	if (!user_name) {
		res.send(`<script>alert('真实姓名不能为空');location.href='http://localhost:3000/04-register.html'</script>`);
		return;
	}
	var gender=obj.gender;
	
	pool.query(sql,[uname,upwd,email,phone,user_name,gender],(err,result)=>{
		if (err) {
			throw err;
		}
		if (result.affectedRows>0) {
			res.send(`<script>alert('注册成功');location.href='http://localhost:3000/01-login.html'</script>`);
		}else {
			res.send('注册异常');
		}

	});
});

//用户登录
router.post('/login',(req,res)=>{
	var uname=req.body.uname;
	var upwd=req.body.upwd;
	if (!uname) {
		res.send({
			code:401,
			msg:"用户名为空"
		});
		return;
	}
	if (!upwd) {
		res.send({
			code:402,
			msg:"密码为空"
		});
		return;
	}
	var sql='select * from pureshop_user where uname=?';
	var sql2='select * from pureshop_user where upwd=?';
	pool.query(sql,uname,(err,result)=>{
		if (err) {
			throw err;
		}
		if (result.length>0) {
			pool.query(sql2,upwd,(err,result)=>{
				if (err) {
					throw err;
				}
				if (result.length>0) {
					res.send('登录成功！');
				}else {
					res.send('密码错误');
				}
			});

		}else {
			res.send('用户名不存在');
		}
	});
});

//用户删除
router.get('/delete',(req,res)=>{
	var obj=req.query;
	var $id=obj.uid;
	if (!$id) {
		res.send({
			code:400,
			msg: 'id require'
		});
		return;
	}else {
		var sql='DELETE FROM pureshop_user WHERE uid=?';
	pool.query(sql,$id,(err,result)=>{
		if (err) {
			throw err;
		}
		if (result.affectedRows>0) {
			res.send({
			code:100,
			msg: 'delete already'
		});
		}else {
			res.send({
				code:404,
				msg:'no this id'
			});
		}
		
	});
	}
	
});

//用户检索
router.get('/query',(req,res)=>{
	var $uid=req.query.uid;
	if (!$uid) {
		res.send({
			code: 402,
			msg: 'uid require'
		});
		return;
	}
	var sql='SELECT * FROM pureshop_user WHERE uid=?';
	pool.query(sql,$uid,(err,result)=>{
		if (result.length>0) {
			res.send(result);
		}else {
			res.send('user doesn`t exist');
		}

	});
});

//用户修改：编号uid，姓名user_name，性别gender，邮箱email，电话phone
router.post('/update',(req,res)=>{
	var obj=req.body;
	var $uid=obj.uid;
	var $user_name=obj.user_name;
	var $gender=obj.gender;
	var $email=obj.email;
	var $phone=obj.phone;
	if (!$uid) {
		res.send({
			code:401,
			msg:"uid require"
		});
		return;
	}
	if (!$user_name) {
		res.send({
			code:402,
			msg:"user_name require"
		});
		return;
	}
	if (!$gender) {
		res.send({
			code:403,
			msg:"gender require"
		});
		return;
	}
	if (!$email) {
		res.send({
			code:404,
			msg:"email require"
		});
		return;
	}
	if (!$phone) {
		res.send({
			code:405,
			msg:"phone require"
		});
		return;
	}
	var sql='UPDATE pureshop_user SET user_name=?,gender=?,email=?,phone=? WHERE uid=?';
	pool.query(sql,[$user_name,$gender,$email,$phone,$uid],(err,result)=>{
		if (err) {
			throw err;
		}
		if (result.affectedRows>0) {
			res.send({
				code:200,
				msg:'update,success'
			});
		}else {
			res.send({
				code:301,
				msg:'update err'
			});
		}
	});

});

//浏览用户列表
router.get('/list',(req,res)=>{
	var obj=req.query;
	var size=parseInt(obj.size);//客户端数据默认传过来是字符型
	var page=parseInt(obj.page);
	if (!size) {
		size=2;
	}
	if (!page) {
		page=1;
	}
	var begin=(page-1)*size;//必须放在if判空后面
	var sql='SELECT * FROM pureshop_user LIMIT ?,?';///此处必须是数值型
	pool.query(sql,[begin,size],(err,result)=>{
		if (err) {
			throw err;
		}
		res.send(result);
	});

});
//导出路由器
module.exports=router;
