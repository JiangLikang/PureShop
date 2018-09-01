const  express=require('express');//搭建服务器
const  pool=require('../pool.js');//连接数据库
var router=express.Router();//创建路由器

//商品的列表
router.get('/list',(req,res)=>{
	var obj=req.query;
	var page=parseInt(obj.page);
	var size=parseInt(obj.size);
	if (!page) {
		page=1;
	}
	if (!size) {
		size=5;
	}
	var begin=(page-1)*size;//必须放在if判空后面
	var sql='SELECT lid,title FROM xz_laptop LIMIT ?,?';
	pool.query(sql,[begin,size],(err,result)=>{
		if (err) {
			throw err;
		}
		res.send(result);
	});
});

//添加商品
router.post('/add',(req,res)=>{
	var obj=req.body;
	// var family_id =obj.family_id;   
	// var title=obj.title;
	// var subtitle=obj.subtitle;
	// var price=obj.price;
	// var promise=obj.promise;
	// var spec=obj.spec;
	// var lname=obj.lname;
	// var os=obj.os;
	// var memory=obj.memory;
	// var resolution=obj.resolution;
	// var video_card=obj.video_card;
	// var cpu=obj.cpu;
	// var video_memory=obj.video_memory;
	// var category=obj.category;
	// var disk=obj.disk;
	// var details=obj.details;
	// var shelf_time=obj.shelf_time;
	// var sold_count=obj.sold_count;
	// var is_online=obj.is_online;
	// var sql='INSERT INTO xz_laptop VALUES(NULL,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)';
	// pool.query(sql,[family_id,title,subtitle,price,promise,spec,lname,os,memory,
	// resolution,video_card,cpu,video_memory,category,disk,
	// details,shelf_time,sold_count,is_online],(err,result)=>{
	// 	if (err) {
	// 		throw err;
	// 	}
	// 	if (result.affectedRows>0) {
	// 		res.send('add ok');
	// 	}
	// });
 	obj.lid=null;
	var sql='INSERT INTO xz_laptop SET ?';
	var i=400;
	for(var key in obj ) {
		i++;
		if (!obj[key]) { //不能写成obj.key
			 res.send({
			 	code:i,
			 	msg:key+' required'
			 });
			 return;
		}
	}
	pool.query(sql,[obj],(err,result)=>{
		if (err) {
			throw err;
		}
		res.send({
			code :200,
			msg:'add success'
		});

	});

});

//商品删除
router.get('/delete',(req,res)=>{
	var obj=req.query;
	var id=obj.lid;
	if (!id) {
		res.send({
			code:401,
			msg:'lid required'
		});
		return;
	}
	var sql='DELETE FROM xz_laptop WHERE lid=?';
	pool.query(sql,id,(err,result)=>{
		if (err) {
			throw err;
		}
		if (result.affectedRows>0) {
			res.send({
				code:200,
				msg:'delete success'
			});
		}else {
			res.send({
				code:400,
				msg:'no this id'
			});
		}
	});

});

//商品删除
router.get('/query',(req,res)=>{
	var obj=req.query;
	var id=obj.lid;
	if (!id) {
		res.send({
			code:401,
			msg:'lid required'
		});
		return;
	}
	var sql='SELECT title FROM xz_laptop WHERE lid=?';
	pool.query(sql,id,(err,result)=>{
		if (err) {
			throw err;
		}
		if (result.length>0) {
			res.send(result);
		}else {
			res.send({
				code:401,
				msg:'no this id'
			});
		}
		
	});

});
module.exports=router;//导出路由器