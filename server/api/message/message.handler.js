const {postMessage, fetchMessages} = require('./message.service')

exports.getMessages= async (req,res)=>{
    const chat_id = req.params.chat_id

    try{
        const messages = await fetchMessages(chat_id);
        res.status(201).send(messages);

    }catch(error){
        console.log(error.message);
        res.status(500).json({message:'Internal Server Error'});
    }
}

exports.sendMessage= async (req,res)=>{
    const {chat_id, content} = req.body;

    try{
        const newMessage = {
            sender:req.user._id,
            content,
            chat: chat_id
        }
        const data = await postMessage(newMessage);
        res.status(201).send(data);

    }catch(error){
        console.log(error.message);
        res.status(500).json({message:'Internal Server Error'});
    }
}

exports.deleteMessage=(req,res)=>{

}

