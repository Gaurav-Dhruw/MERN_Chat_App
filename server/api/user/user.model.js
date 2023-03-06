const Schema = require("mongoose").Schema;
const mongoose = require("mongoose");

const userSchema= new Schema({
        name:{
            type:String,
            trim:true,
            required:true
        },
        email:{
            type:String,
            required:true,
            trim:true,
            unique:true,
        },
        password:{
            type:String,
            trim:true,
            required:true
        },
        picture:{
            type:String,
            required:true,
            default:"https://pin.it/6RDQHH9"
        }
    },
    {
        timestamps:true
    }
);

const User = mongoose.model("User",userSchema);
module.exports= User;