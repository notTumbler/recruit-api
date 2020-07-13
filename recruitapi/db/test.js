const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/chen',{ useNewUrlParser: true , useUnifiedTopology:true });

const conn = mongoose.connection;

conn.on('connected',()=>{
  console.log('数据库连接成功咯~');
});