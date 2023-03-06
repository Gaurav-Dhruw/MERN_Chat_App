import {createContext , useContext, useState, useReducer} from 'react';

const chatContext = createContext();

const onlineUsersReducer = (state,action)=>{
    switch(action.type){
        case "UPDATE":
            let newState = new Map(state);
            newState.set(action.payload._id,action.payload.users);
            return newState;
        default:
            return state;
    }
}

const messagesReducer = (state,action)=>{
    // console.log(state);
    switch(action.type){
        case "SET_MESSAGES":
            return action.payload;
        case "ADD_MESSAGE":
            return [...state,action.payload];
        default:
            return state;
    }
}

const chatListReducer = (state, action) =>{
    let chatList = [...state];
    let chat, message, oldChat;
    // if(action.type==="")console.log()
    switch (action.type){
        case "SET_CHATLIST":
            // action.payload.forEach(chat=>{
            //     chat.notification = 0;
            // });
            return action.payload;
        
        case "UPDATE_CHATLIST":
            message = {...action.payload};
            chat = {...message.chat};
            chat.latestMessage = message;
            // chat.notification=0;
            chatList = chatList.filter( ele => ele._id !== chat._id);
            return [chat,...chatList];
        
        case "SET_NOTIFICATION":
            message = {...action.payload};
            chat = {...message.chat};
            chat.latestMessage = message;

            oldChat = chatList.find(ele => ele._id === chat._id);
            chatList = chatList.filter( ele => ele._id !== chat._id);

            chat.notification = oldChat.notification ? oldChat.notification + 1 : 1;

            return [chat,...chatList];
        
        case "UNSET_NOTIFICATION":
            chat = {...action.payload};
            oldChat = chatList.find(ele => ele._id === chat._id);
            delete oldChat.notification;
            return chatList;
        default:
            return state;
    }
}
const ChatProvider = ({children}) =>{
    const [userInfo, setUserInfo] = useState(null);
    const [activeChat, setActiveChat] = useState(null);
    const [chatList, dispatchChatList] = useReducer(chatListReducer,[]);
    const [searchList, setSearchList] = useState([]);
    const [onlineUsers, dispatchOnlineUsers] = useReducer(onlineUsersReducer,new Map());
    const [messages, dispatchMessages] = useReducer(messagesReducer,[]);
    console.log(chatList);
    return (
        <chatContext.Provider
            value={{
                userInfo,
                setUserInfo,
                activeChat,
                setActiveChat,
                chatList,
                dispatchChatList,
                searchList,
                setSearchList,
                onlineUsers,
                dispatchOnlineUsers,
                messages,
                dispatchMessages
            }}>
            {children}
        </chatContext.Provider>
    )
} 

export const useChat = () => useContext(chatContext); 
export default ChatProvider;