
export const formatSearchList = ({chats})=>{
    const result = chats.map(chat=>{
        chat.chatName = chat.name
        return chat
    });
    return result;
}

export const formatChatList = ({userInfo,chats}) => {
    const result = chats.map(chat=>{
        if(chat.users) chat.users = chat.users.filter(user=>userInfo._id!==user._id);
        if(!chat.chatName) chat.chatName = chat.users[0].name;
        return chat
    });
    return result;
}

export const formatChat = ({userInfo,chat}) => {
    let result = chat;
    console.log(result, userInfo);
    result.users = result.users.filter(user=>user._id!==userInfo._id);
    result.chatName = chat.users[0].name;
    return result;
}