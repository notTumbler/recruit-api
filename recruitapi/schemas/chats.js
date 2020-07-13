const mongoose = require('mongoose')

module.exports = new mongoose.Schema({
  from:{type:String,required:true},    //发送消息的用户的id 
  to:{type:String,required:true},      //接受消息的用户的id
  chat_id:{type:String,required:true}, //from和to组成的字符串
  content:{type:String,required:true}, //内容
  read:{type:Boolean,default:false},  //标识是否已读
  create_time:{type:Number}            //创建时间
})