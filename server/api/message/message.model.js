const Schema = require("mongoose").Schema;
const mongoose = require("mongoose");

const messageSchema = new Schema({
        chat:{
            required:true,
            type:Schema.Types.ObjectId,
            ref:"Chat"
        },
        content:{
            type:String, 
            trim:true
        },
        sender:{
            type:Schema.Types.ObjectId,
            ref:"User"
        },

    },
    {
        timestamps:true
    }
);

const Message = mongoose.model("Message",messageSchema);
module.exports= Message;