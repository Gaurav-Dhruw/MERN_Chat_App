const User = require('./user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cookie = require('cookie');

exports.findProfile= async (email)=>{
    const user = await User.findOne({email});
    if(user.length === 0)
        return null;
    return user;
}

exports.createProfile = async({email,name,picture})=>{
    const password = generatePassword();
    const hashed_password = await bcrypt.hash(password,10);

    const data = User.create({name,email,password:hashed_password,picture});

    return {_id : data._id, name, email, picture};
}

exports.checkExistence = async(email)=>{

    const user = await User.findOne({email});

    if(user){
        throw new Error('Email already registered');
    }
}

exports.createUser = async({name,email,password,picture}) =>{

    const hashed_password = await bcrypt.hash(password,10);

    const data = await User.create({name,email,password:hashed_password,picture});

    const {_id} = data;
    const result = {_id, name, email, picture};

    return result;
}


exports.findUsers = async ({keyword,curr_user}) =>{
    const query = keyword ?{
        $or:[
            {name:{$regex: keyword,$options:'i'}},
            {email:{$regex: keyword, $options:'i'}}
        ]
    }:{};

    const data = await User.find(query,'-password').find({_id:{$ne: curr_user._id}});
    return data;
}

exports.verifyAndGetUser= async ({email,password}) =>{
    
    const user = await User.findOne({email});
    const {_id,name,picture} = user;
    
    const verified = bcrypt.compare(password,user.password);
    
    if(verified) {
        return {_id,name,email,picture};
    }
    else 
        throw new Error();
}

function generatePassword() {
    var length = 12,
    charset = "@#$&*0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ@#$&*0123456789abcdefghijklmnopqrstuvwxyz",
    password = "";
    for (var i = 0, n = charset.length; i < length; ++i) {
        password += charset.charAt(Math.floor(Math.random() * n));
    }
    return password;
 }


