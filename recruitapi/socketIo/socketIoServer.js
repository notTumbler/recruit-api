const ChatModel = require('../models/chats')


module.exports = function(server) {
  const io = require('socket.io')(server);
  //一个客户端连接上了服务器
  io.on('connection',(socket) => {
    console.log('一个客户端连接上了服务器');
    //接收客户端发来的消息
    socket.on('sendMsg',({from,to,content}) => {
      console.log(`客户端发来了消息`,{from,to,content});
      //对数据进行处理（保存消息 引入model ChatModel）
      //先准备ChatMsg对象的相关属性
      //格式from_to或者 to_from 排序解决
      const chat_id = [from,to].sort().join('_');
      const create_time = Date.now();
      new ChatModel({from,to,content,chat_id,create_time}).save((error,chatMsg) => {
        console.log(chatMsg,error);
        //向所有连接的客户端返回消息
        io.emit('receiveMsg',chatMsg);
      });
    })
  })
}