/*
Navicat MySQL Data Transfer

Source Server         : localhost
Source Server Version : 50611
Source Host           : localhost:3306
Source Database       : activation_code

Target Server Type    : MYSQL
Target Server Version : 50611
File Encoding         : 65001

Date: 2014-03-23 22:10:37
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `tb_contact_info`
-- ----------------------------
DROP TABLE IF EXISTS `tb_contact_info`;
CREATE TABLE `tb_contact_info` (
  `pkid` int(11) NOT NULL AUTO_INCREMENT,
  `serial_number` int(11) NOT NULL COMMENT '序列号',
  `phone` varchar(25) NOT NULL DEFAULT '' COMMENT '联系电话',
  `address` varchar(100) DEFAULT NULL COMMENT '地址',
  `express_number` varchar(20) NOT NULL DEFAULT '' COMMENT '物流编号',
  `shipment_status` tinyint(4) NOT NULL DEFAULT '0' COMMENT '发货状态，1.已发货',
  `created` datetime NOT NULL COMMENT '生成时间，即发货时间',
  `modified` datetime DEFAULT NULL COMMENT '修改时间',
  PRIMARY KEY (`pkid`,`serial_number`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='联系人信息表';

-- ----------------------------
-- Records of tb_contact_info
-- ----------------------------

-- ----------------------------
-- Table structure for `tb_serial_code`
-- ----------------------------
DROP TABLE IF EXISTS `tb_serial_code`;
CREATE TABLE `tb_serial_code` (
  `pkid` int(11) NOT NULL AUTO_INCREMENT COMMENT '序列号',
  `code_password` varchar(20) NOT NULL,
  `status` tinyint(2) NOT NULL DEFAULT '0' COMMENT '激活状态。0：未激活 1.已激活',
  `activation_type` tinyint(2) NOT NULL DEFAULT '0' COMMENT '激活类型：1.三斤樱桃',
  `created` datetime NOT NULL COMMENT '记录生成时间',
  `modified` datetime DEFAULT NULL COMMENT '最近更新时间',
  PRIMARY KEY (`pkid`)
) ENGINE=InnoDB AUTO_INCREMENT=1001 DEFAULT CHARSET=utf8 COMMENT='序列号表';

-- ----------------------------
-- Records of tb_serial_code
-- ----------------------------