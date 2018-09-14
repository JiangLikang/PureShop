SET NAMES UTF8;
DROP DATABASE IF EXISTS pureshop;
CREATE DATABASE pureshop CHARSET=UTF8;
USE pureshop;
#网站基本信息表
CREATE TABLE pureshop_web_info(
  web_name VARCHAR(16),
  logo VARCHAR(64),
  admin_email VARCHAR(64),
  icp VARCHAR(32),
  copyright VARCHAR(64)

);

INSERT INTO pureshop_web_info VALUES
('PureShop','img/log.png','admin@ps.com','京ICP证080933255号','版权所有@2015-2018 PureShop');

#导航表
CREATE TABLE pureshop_nav(
    nid INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(16),
    url VARCHAR(128),
    title VARCHAR(32),
    parent INT #设置二级菜单
);

INSERT INTO pureshop_nav VALUES
(NULL,'首页','/index.html','跳转到网站的首页',NULL),
(NULL,'男装','/man.html','进入男装',1),
(NULL,'女装','/women.html','进入女装',1);

/**女装产品**/
CREATE TABLE pureshop_product_woman(
  wid INT PRIMARY KEY AUTO_INCREMENT,
  lg VARCHAR(128)             #大图片路径
  sm1 VARCHAR(128),            #小图片路径
  sm2 VARCHAR(128),            #小图片路径
  sm3 VARCHAR(128),            #小图片路径
  sm4 VARCHAR(128),            #小图片路径
  sm5 VARCHAR(128),            #小图片路径
  title VARCHAR(128),         #主标题
  subtitle VARCHAR(128),      #副标题
  price DECIMAL(10,2),        #价格
  score DECIMAL(2,1)          #评分
  sold_count INT,             #累积销量
  stock VARCHAR(64),          #库存
  promise VARCHAR(64),        #服务承诺
  pname VARCHAR(32),          #商品名称 
);


/**用户信息**/
CREATE TABLE pureshop_user(
  uid INT PRIMARY KEY AUTO_INCREMENT,
  uname VARCHAR(32),
  upwd VARCHAR(32),
  email VARCHAR(64),
  phone VARCHAR(16),
  avatar VARCHAR(128),        #头像图片路径
  user_name VARCHAR(32),      #用户名，如王小明
  gender INT                  #性别  0-女  1-男
);

/**收货地址信息**/
CREATE TABLE pureshop_receiver_address(
  aid INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT,                #用户编号
  receiver VARCHAR(16),       #接收人姓名
  province VARCHAR(16),       #省
  city VARCHAR(16),           #市
  county VARCHAR(16),         #县
  address VARCHAR(128),       #详细地址
  cellphone VARCHAR(16),      #手机
  fixedphone VARCHAR(16),     #固定电话
  postcode CHAR(6),           #邮编
  tag VARCHAR(16),            #标签名

  is_default BOOLEAN          #是否为当前用户的默认收货地址
);

/**购物车条目**/
CREATE TABLE pureshop_shoppingcart(
  iid INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT,      #用户编号
  product_id INT,   #商品编号
  count INT,        #购买数量
  is_checked BOOLEAN #是否已勾选，确定购买
);

/**用户订单**/
CREATE TABLE pureshop_order(
  aid INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT,
  address_id INT,
  status INT,             #订单状态  1-等待付款  2-等待发货  3-运输中  4-已签收  5-已取消
  order_time BIGINT,      #下单时间
  pay_time BIGINT,        #付款时间
  deliver_time BIGINT,    #发货时间
  received_time BIGINT    #签收时间
)AUTO_INCREMENT=10000000;

/**用户订单**/
CREATE TABLE pureshop_order_detail(
  did INT PRIMARY KEY AUTO_INCREMENT,
  order_id INT,           #订单编号
  product_id INT,         #产品编号
  count INT               #购买数量
);

/****首页轮播广告商品****/
CREATE TABLE pureshop_index_carousel(
  cid INT PRIMARY KEY AUTO_INCREMENT,
  img VARCHAR(128),
  title VARCHAR(64)
);

/****首页商品****/
CREATE TABLE pureshop_index_product(
  pid INT PRIMARY KEY AUTO_INCREMENT,
  type VARCHAR(16),
  title VARCHAR(64),
  pic VARCHAR(128),
  price DECIMAL(10,2),
  href VARCHAR(128)
);

/*******************/
/******数据导入******/
/*******************/

/**用户信息**/
INSERT INTO pureshop_user VALUES
(NULL, 'dingding', '123456', 'ding@qq.com', '13501234567', 'img/avatar/default.png', '丁伟', '1'),
(NULL, 'dangdang', '123456', 'dang@qq.com', '13501234568', 'img/avatar/default.png', '林当', '1'),
(NULL, 'doudou', '123456', 'dou@qq.com', '13501234569', 'img/avatar/default.png', '窦志强', '1'),
(NULL, 'yaya', '123456', 'ya@qq.com', '13501234560', 'img/avatar/default.png', '秦小雅', '0');

/****首页轮播广告商品****/
INSERT INTO pureshop_index_carousel VALUES
(NULL, 'img/index/banner1.png','轮播广告商品1'),
(NULL, 'img/index/banner2.png','轮播广告商品2'),
(NULL, 'img/index/banner3.png','轮播广告商品3'),
(NULL, 'img/index/banner4.png','轮播广告商品4');

/****首页商品****/
INSERT INTO pureshop_index_product VALUES
(NULL,'xianshi','女装秋装胖mm新款藏肉连衣裙洋气套装胖妹妹显瘦两件套','img/index/xianshi1.png',75),
(NULL,'xianshi','秋季2018新款原宿时尚套装连帽运动卫衣套装女休闲风短款卫衣韩版休闲裤学生显瘦两件套卡麦丝','img/index/xianshi2.png',47),
(NULL,'xianshi','热卖套装早秋新款中长款无袖吊带连衣裙+长袖宽松显瘦百搭长款毛衣裙子套装','img/index/xianshi3.png',89),
(NULL,'xianshi','秋季帅气bf女装酷潮衣服原宿风嘻哈少女街拍网红宽松两件套装裤女','img/index/xianshi4.png',79),
(NULL,'xianshi','卫衣套装2018女春秋新款韩版宽松连帽学生ulzzang休闲运动两件套装','img/index/xianshi5.png',39)


