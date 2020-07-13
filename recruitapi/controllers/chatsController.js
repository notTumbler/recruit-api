var express = require('express');
var router = express.Router();

const md5 = require('blueimp-md5')

const User = require('../models/user');
const Chats = require('../models/chats')

const filter = { password:0, __v:0 }

let resData = {};
router.use((req, res, next) => {
  resData = {
    code: 0,
    msg: ''
  };
  next();
});

//获取当前用户所有相关聊天信息列表
getMsgList = (req,res) => {
  const  userid = req.cookies.userId;

  //查询得到所有的user文档
  User.find((error,userDocs) => {
    console.log(userDocs,error);
    
    const users = {}
    userDocs.forEach(doc => {
      users[doc._id] = {username:doc.username,header:doc.header}
    });

    Chats.find({'$or':[{from:userid},{to:userid}]},filter)
    .then((chatMsgs,error) => {
      resData.code = 200;
      resData.data = {users,chatMsgs}
      res.send(resData);
    })
  })
}

//修改指定消息为已读
readMsg = (req,res) => {
  const from = req.body.from;
  const to = req.cookies.userId;
  /**
   * 更新数据库中的chat数据
   * 参数1：查询的条件
   * 参数2：更新为指定的数据对象
   * 参数3：是否1次更新多条，默认只更新一条
   * 参数4：更新完成的回调函数
   */
  Chats.update({from,to,read:false},{read:true},{multi:true}).then((doc,err) => {
    console.log(doc,err);
    
    resData.code = 200;
    resData.data = doc.nModified;//更新的数量
    res.send(resData);
  })
}

module.exports = {
  getMsgList,
  readMsg
}