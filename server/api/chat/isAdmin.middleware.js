const Chat = require('./chat.model');

exports.isAdmin = async (req,res,next) => {
    const {user_id} = req.user;
    const {chat_id} = req.body;

    try{

        const chat =await Chat.find({_id:chat_id});
    
        if(chat.groupAdmin !== user_id ){
            return res.sendStatus(401);
        }
        next();

    }catch(error){
        console.log(error.message);
        res.sendStatus(500);
    }
}