const mongoose = require('mongoose')

module.exports = new mongoose.Schema({
  username:{ type:String, required:true },
  password:{ type:String, required:true },
  type:{ type:String, required:true }, //用户类型:大神/老板
  header:{ type:String, }, //头像名称
  post:{ type:String, }, //职位
  info:{ type:String, }, //个人或职位简介
  company:{ type:String, }, //公司名称
  salary:{ type:String, }, //工资
  city:{type:String}
})