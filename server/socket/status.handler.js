const {findAllChats} = require('../api/chat/chat.service');

let chatUsers = new Map();
let socketUser = new Map();

module.exports = (io) =>{

    const setOnlineUsers = async function(user){
        const socket = this;
        socketUser.set(socket.id,user._id);

        // console.log('online',user);
        let chatList = await findAllChats(user._id);

        chatList.forEach(chat => {
            const chat_id = chat._id.toString();
            if(chatUsers.has(chat_id)){
                let users = chatUsers.get(chat_id);
                users.push(user._id);
                chatUsers.set(chat_id,users);
            }
            else{
                chatUsers.set(chat_id,[user._id]);
            }
            
            socket.join(chat_id);
            io.to(chat_id).emit('online-users',{_id:chat_id, users:chatUsers.get(chat_id)});
        })
        console.log('nline',chatUsers);
    }
    
    
    const removeOnlineUsers = async function(){
        const socket = this;
        const user_id = socketUser.get(socket.id);
        socketUser.delete(socket.id);

        // console.log('offline',user_id);
        let chatList = await findAllChats(user_id);
        chatList = chatList.map(chat => {
            const chat_id = chat._id.toString();
    
            let users = chatUsers.get(chat_id);
            users = users.filter( participant_id=> user_id != participant_id);
            chatUsers.set(chat_id,users);
    
            socket.leave(chat_id);
            io.to(chat_id).emit('online-users',{_id:chat_id, users});
        })
        console.log('offlien',chatUsers);
    }

    return {
        setOnlineUsers,
        removeOnlineUsers,
    }
}