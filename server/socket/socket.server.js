const {Server} = require('socket.io');
const statusHandler = require('./status.handler');
const messageHandler = require('./message.handler');

module.exports = (httpServer)=>{
    const io = new Server(httpServer,{
        cors:{
            origin: ['http://localhost:5000',"http://localhost:3000"],
            credentials:true
        }
    });
    const {setOnlineUsers, removeOnlineUsers,} = statusHandler(io);
    const { handleSentMessage} = messageHandler(io);
    
    io.on('connect',(socket)=>{
        
        socket.on('online', setOnlineUsers);
        socket.on('offline',removeOnlineUsers);
        socket.on('disconnect',removeOnlineUsers);
        socket.on('message-sent',handleSentMessage);

    });
};


