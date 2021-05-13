const mongoose = require('mongoose')

// name:'',
// workWill:'',
// jiaoYu:'',
// shiXi:'',
// skills:''
module.exports = new mongoose.Schema({
  userId:{type:String,required:true},
  name:{type:String,required:true},
  workWill:{type:String,required:true},
  jiaoYu:{type:String,required:true},
  shiXi:{type:String,required:true},
  skills:{type:String,required:true}
})