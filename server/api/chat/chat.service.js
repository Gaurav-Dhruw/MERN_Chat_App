const Chat = require('./chat.model');
const User = require('../user/user.model');

exports.findChat = async (sender_id, receiver_id) =>{
    let chat =  await Chat.findOne({
        isGroupChat:false, 
        $and:[
            {users:{$elemMatch:{$eq:sender_id}}},
            {users:{$elemMatch:{$eq:receiver_id}}},
        ],
        
    })
    .populate('users','-password')
    .populate('latestMessage');

    chat = await User.populate(chat,{
        path:'latestMessage.sender',
        select:'name picture email',
    });
    // console.log(chat);
    if(chat){
        return chat;
    }

    const chatData = {
        isGroupChat:false,
        users:[sender_id,receiver_id],
    }
    const createdChat = await Chat.create(chatData);
    chat = await Chat.findOne({_id:createdChat._id}).populate('users','-password'); 
    return chat;
}

exports.findAllChats = async (user_id)=>{
    let chats = await Chat.find({users:{
        $elemMatch:{
            $eq:user_id
        }
    }})
    .populate('users','-password')
    .populate('groupAdmin','-password')
    .populate('latestMessage')
    .sort({updatedAt:-1});
    
    chats = await User.populate(chats,{
        path:'latestMessage.sender',
        select:'name picture email',
    });

    return chats;
}

exports.createChat = async (req,users) => {
    let groupChat = await Chat.create({
        chatName:req.body.chatName,
        users,
        isGroupChat:true,
        groupAdmin:req.user._id,
    });
    groupChat = await groupChat.populate('users','-password');
    groupChat = await groupChat.populate('groupAdmin','-password');

    return groupChat;
}

exports.updateParticipants = async (chat_id, user_id,status) =>{
    switch(status){
        case "ADD":
            await Chat.findByIdAndUpdate(
                chat_id,
                {
                    $push:{users:user_id},
                },
            );
            break;
        case "REMOVE":
            await Chat.findByIdAndUpdate(
                chat_id,
                {
                    $pull:{users:user_id},
                },
            );
            break;
    }
}