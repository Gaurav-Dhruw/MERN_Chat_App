

module.exports = (io) =>{
    const handleSentMessage = async function (message) {
        try{
            const {_id} = message.chat;
            io.to(_id).emit('message-received',message);
        }catch(err){
            console.log(err.message);
        }
    }

    return {
        handleSentMessage,
    }
}