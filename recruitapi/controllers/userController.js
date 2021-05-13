var express = require('express');
var router = express.Router();

const md5 = require('blueimp-md5')

const User = require('../models/user');
const { log } = require('debug');

const filter = { password:0, __v:0 }

let resData = {};
router.use((req, res, next) => {
  resData = {
    code: 0,
    msg: ''
  };
  next();
});

//注册的路由
register = (req, res) => {
  const { username, password, type } = req.body;
  console.log(username);

 User.findOne({ username:username })
  .then((result,err) => {
    if (result) {
      resData.code = 4;
      resData.msg = '用户已存在';
      res.send(resData);
      // console.log(resData);
    } else {
      new User({username,password:md5(password),type}).save((err,user) => {
        console.log(user);
        //生成一个cookie(userid:user._id),交给浏览器
        res.cookie('userId',user._id,{maxAge:1000*60*60*24});
        //返回的数据中不应该携带password
        const data = {_id:user.id,username,type}
        res.send({
          code:200,
          data:data
        });
      })
    }
  })
};

//登录
login = (req,res) => {
  const { username, password } = req.body;
  console.log(username,password)
  console.log('chenchen' + md5(password))
  User.findOne({username,password:md5(password)})
  .then((user,err) => {
    console.log(user);
    if(user){
      res.cookie('userId',user._id,{maxAge:1000*3600*24});
      resData.code = 200;
      resData.msg = '登录成功';
      resData.data = user;
      res.send(resData)
    }else{
      resData.code = 400;
      resData.msg = '用户名或密码错误';
      resData.data = '';
      res.send(resData);
    }
  });
};

//更新用户信息的路由
updateUserInfo = (req,res) => {
  //从请求的cookies中获取userId
  const userId = req.cookies.userId;
  if(!userId){
    resData.code = 1;
    resData.msg = '请先登录';
    res.send(resData);
    return;
  }
  //存在cookies，根据对应的userId更新对应的user文档数据
  //得到提交的用户数据
  const user = req.body; //没有_id
  
  User.findByIdAndUpdate({_id:userId},user,(err,oldUser) =>{
    if(!oldUser){
      //通知浏览器删除cookie
      res.clearCookie('userId');
      //返回一个提示信息
      resData.code = 1;
      resData.msg = '请先登录';
      res.send(resData);
      return;
    }else{
      const { _id,username,type  } = oldUser;
      const data = Object.assign(user,{ _id,username,type });
      console.log(data)
      //返回数据
      resData.code = 200;
      resData.msg = '用户信息修改成功';
      resData.data = data;
      res.send(resData);
    }
  })
}

//获取用户信息的路由(根据cookie中的userid)
getUserInfo = (req,res) => {
  //从请求的cookie中得到userId
  const userid = req.cookies.userId;
  if(!userid){
    resData.code = 1;
    resData.msg = '请先登录';
    return res.send(resData);
  }
  //根据userid查询对应的user
  User.findOne({_id:userid})
  .then((user,err) => {
    // console.log(user);
    resData.code = 200;
    resData.msg = '获取userInfo成功';
    resData.data = user;
    res.send(resData);
  })
}
//修改用户的密码
getuserpassword = (req,res) => {
  const  userId = req.cookies.userId;
  const { newPassword } = req.body;
  const setPsw = md5(newPassword)
  console.log('set'+ setPsw+'~')
  User.findByIdAndUpdate({_id:userId},{$set:{password:setPsw}},(err,result)=>{
    if(err){
      resData.code = 0
      resData.msg = '出错了,修改失败'
      res.send(resData)
    }
    resData.code = 200
    resData.msg = '密码修改成功'
    resData.data = md5(newPassword)
    res.send(resData)
  })
}
//获取用户列表(根据user.type)
getUserList = (req,res) => {
  const {type} = req.query;
  User.find({type:type},filter)
  .then((users) => {
    // console.log(users);
    resData.code = 200;
    resData.msg = '获取用户列表成功';
    resData.data = users;
    res.send(resData);
  });
}


module.exports = {
  register,
  login,
  updateUserInfo,
  getUserInfo,
  getUserList,
  getuserpassword
}