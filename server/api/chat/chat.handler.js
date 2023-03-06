const {findChat, findAllChats, updateParticipants, createChat} = require('./chat.service');

exports.getChat = async (req,res)=>{
    const receiver_id = req.body._id;
    const sender_id = req.user._id;
    try{
        if(!receiver_id) throw new Error(); 
        const chat = await findChat(sender_id,receiver_id);
        // await console.log(chat);
        res.status(201).send(chat);
    }
    catch(error){
        console.log(error.message);
        res.status(500).json({message:'Interal Server Error'});
    }
};

exports.getAllChats = async (req,res)=>{
    const {_id:user_id} = req.user;

    try{
        const chats = await findAllChats(user_id);;
        res.status(201).send(chats);
    }
    catch(error){
        console.log(error.message);
        res.status(500).json({message:'Internal Server Error'});
    }
}

exports.createGroupChat = async ( req, res) =>{
    let users = req.body.users;
    users.push(req.user);

    try{
        const groupChat = await createChat(req,users);
        res.status(201).send(groupChat);
    }catch(error){
        console.log(error.message);
        res.status(500).json({messagae:'Internal Serval Error'})
    }
}

exports.addToGroup = async (req, res) => {
    const {chat_id, user_id} = req.body;

    try{
        const chat = updateParticipants(chat_id,user_id,"ADD");
        res.status(201).send(chat);
    }
    catch(error){
        res.status(500).json({messagae:'Internal Serval Error'})
    }

}
exports.removeFromGroup = async (req, res) => {
    const {chat_id, user_id} = req.body;

    try{
        await updateParticipants(chat_id,user_id,"REMOVE");
        res.status(201).send(chat);
    }
    catch(error){
        res.status(500).json({messagae:'Internal Serval Error'})
    }
}