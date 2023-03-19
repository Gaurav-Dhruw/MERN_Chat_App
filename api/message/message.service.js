const Chat = require('../chat/chat.model');
const Message = require('./message.model');
const User = require('../user/user.model');


exports.fetchMessages = async(chat_id) => {
    const messages = await Message.find({chat:chat_id})
    .populate('sender','name picture email')
    .populate('chat');

    return messages;
}

exports.postMessage = async (newMessage) =>{
    let message = await Message.create(newMessage);

    await Chat.findByIdAndUpdate(message.chat,{
        latestMessage:message._id,
    });

    message = await message.populate("sender","name picture email");
    message = await message.populate("chat");
    message = await User.populate(message,{
        path:'chat.users',
        select:'name picture email'
    });

    return message;

}