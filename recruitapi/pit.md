### 将密码单独分离 不让服务器将密码返回前台 && 生成一个为期一天的cookie
#### 方法一：
new User({username,password:md5(password),type})
.save((err,user) => {

  //生成一个cookie(userid:user._id),交给浏览器
  res.cookie('userId',user._id,{maxAge:1000*60*60*24});

  //返回的数据中不应该携带password
  const data = {_id:user.id,username,type}
  res.send({
  code:0,
  data:data
  });
})
#### 方法二:  先定义,后使用 
const filter = { password:0,__v:0}
User.findOne({username,password:md5(password)},filter)

*6.29*
#### User.find().then((users,err)=>{})里第一个参数是返回的数据，第二个参数才是错误信息

*7.1*
### 当返回的数据为[object,object]时，需要取到具体的key值才能显示出value

*7.10*
## *const chat_id = [from,to].sort().join('_');按照什么排序？怎么就可以实现 from_to或者to_from 格式了？
##### mongoose里的方法，直接用回调函数是(error,data),用.then()的方法是(data,error);
