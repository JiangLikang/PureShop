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

/**女装产品**/
CREATE TABLE pureshop_product_woman(
  wid INT PRIMARY KEY AUTO_INCREMENT,
  type VARCHAR(16),           #所属分类 
  title VARCHAR(128),         #标题
  price DECIMAL(10,2),        #价格
  score DECIMAL(2,1)          #评分
  sold_count INT,             #累积销量
  stock VARCHAR(64),          #库存
  show VARCHAR(128),          #展示图片路径
  lg1 VARCHAR(128),           #大图片路径
  lg2 VARCHAR(128),
  lg3 VARCHAR(128),
  lg4 VARCHAR(128),
  lg5 VARCHAR(128),            
  md1 VARCHAR(128),          #中图片路径   
  md2 VARCHAR(128),            
  md3 VARCHAR(128),            
  md4 VARCHAR(128),            
  md5 VARCHAR(128),            
  sm1 VARCHAR(128),           #小图片路径
  sm2 VARCHAR(128),            
  sm3 VARCHAR(128),            
  sm4 VARCHAR(128),            
  sm5 VARCHAR(128),
  xg1 VARCHAR(128),          #效果图
  xg2 VARCHAR(128)
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
(NULL,'autumn','女装秋装胖mm新款藏肉连衣裙洋气套装胖妹妹显瘦两件套',75,8,855,1000,'img/products_women/autumn1_md1.png','img/products_women/autumn1_lg1.png','img/products_women/autumn1_lg2.png','img/products_women/autumn1_lg3.png','img/products_women/autumn1_lg4.png','img/products_women/autumn1_lg5.png','img/products_women/autumn1_md1.png','img/products_women/autumn1_md2.png','img/products_women/autumn1_md3.png','img/products_women/autumn1_md4.png','img/products_women/autumn1_md5.png','img/products_women/autumn1_sm1.png','img/products_women/autumn1_sm2.png','img/products_women/autumn1_sm3.png','img/products_women/autumn1_sm4.png','img/products_women/autumn1_sm5.png','img/products_women/autumn1_xg1.png','img/products_women/autumn1_xg2.png'),
(NULL,'autumn','三件套秋季新品韩版文艺清新荷叶边长袖衬衫+马甲毛衣无袖针织背心+高腰休闲牛仔裤时尚套装女',47,5,744,2000,'img/products_women/autumn2_md1.png','img/products_women/autumn2_lg1.png','img/products_women/autumn2_lg2.png','img/products_women/autumn2_lg3.png','img/products_women/autumn2_lg4.png','img/products_women/autumn2_lg5.png','img/products_women/autumn2_md1.png','img/products_women/autumn2_md2.png','img/products_women/autumn2_md3.png','img/products_women/autumn2_md4.png','img/products_women/autumn2_md5.png','img/products_women/autumn2_sm1.png','img/products_women/autumn2_sm2.png','img/products_women/autumn2_sm3.png','img/products_women/autumn2_sm4.png','img/products_women/autumn2_sm5.png','img/products_women/autumn2_xg1.png','img/products_women/autumn2_xg2.png'),
(NULL,'autumn','秋季帅气bf女装酷潮衣服原宿风嘻哈少女街拍网红宽松两件套装裤女',79,7,344,2000,'img/products_women/autumn3_md1.png','img/products_women/autumn3_lg1.png','img/products_women/autumn3_lg2.png','img/products_women/autumn3_lg3.png','img/products_women/autumn3_lg4.png','img/products_women/autumn3_lg5.png','img/products_women/autumn3_md1.png','img/products_women/autumn3_md2.png','img/products_women/autumn3_md3.png','img/products_women/autumn3_md4.png','img/products_women/autumn3_md5.png','img/products_women/autumn3_sm1.png','img/products_women/autumn3_sm2.png','img/products_women/autumn3_sm3.png','img/products_women/autumn3_sm4.png','img/products_women/autumn3_sm5.png','img/products_women/autumn3_xg1.png','img/products_women/autumn3_xg2.png'),
(NULL,'autumn','2018秋季新款女装小香风约会网纱裙套装慵懒风毛衣两件套裙',79,7.6,774,3000,'img/products_women/autumn4_md1.png','img/products_women/autumn4_lg1.png','img/products_women/autumn4_lg2.png','img/products_women/autumn4_lg3.png','img/products_women/autumn4_lg4.png','img/products_women/autumn4_lg5.png','img/products_women/autumn4_md1.png','img/products_women/autumn4_md2.png','img/products_women/autumn4_md3.png','img/products_women/autumn4_md4.png','img/products_women/autumn4_md5.png','img/products_women/autumn4_sm1.png','img/products_women/autumn4_sm2.png','img/products_women/autumn4_sm3.png','img/products_women/autumn4_sm4.png','img/products_women/autumn4_sm5.png','img/products_women/autumn4_xg1.png','img/products_women/autumn4_xg2.png'),


(NULL,'xianshi','卫衣套装2018女春秋新款韩版宽松连帽学生ulzzang休闲运动两件套装','img/index/xianshi5.png',39)


