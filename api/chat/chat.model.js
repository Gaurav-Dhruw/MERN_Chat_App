const Schema = require("mongoose").Schema;
const mongoose = require("mongoose");

const chatSchema = new Schema({
        users:[{
            type:Schema.Types.ObjectId,
            ref:"User",
        }],
        chatName:{
            type:String, 
            trim:true
        },
        isGroupChat:{
            type:Boolean
        },
        latestMessage:{
            type:Schema.Types.ObjectId,
            ref:"Message",
        },
        groupAdmin:{
            type:Schema.Types.ObjectId,
            ref:"User",
        },
    },
    {
        timestamps:true
    }
);

const Chat = mongoose.model("Chat",chatSchema);

module.exports= Chat;