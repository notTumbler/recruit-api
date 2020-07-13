// module.exports = function(server){
//   const io = require('socket.io')(server);
//   io.on('connection',function(socket){
//     console.log('socketio.connected');
//     socket.on('sendMsg',function(data){
//       console.log('服务器接受到浏览器的消息了',data);
      
//       io.emit('receiveMsg',data.name + '_' + data.data);
//       console.log('服务器向浏览器发送消息了',data);
//     })
//   })
// }
module.exports = function(server){
  const io = require('socket.io')(server);
  //监视客户端与服务器的连接
  io.on('connection',function(socket){
    console.log('一个客户端连接上了服务器哦');

    //接受消息
    socket.on('sendMsg',data => {
      console.log('服务器接受到客户端发来的消息：'+data.name);
      //中间对数据进行处理
      data.name += ',欢迎';
      //服务器返回消息给客户端
      socket.emit('receiveMsg',data);
      console.log('服务器向客户端返回消息了'+data.name);
    })
  })
}
