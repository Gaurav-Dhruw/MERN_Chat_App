const {checkExistence,createUser, verifyAndGetUser, findUsers, findProfile, createProfile} = require('./user.service');
const {generateToken} = require('../../config/generateToken');


exports.OAuth = async (req,res)=>{
    const {email,name,picture} = req.body;
    try{
        const user = await findProfile(email);
        // console.log(user);
        if(user){
            const token = await generateToken(user); 
            return res.status(200).send({token});
        }
        else{
            const user = createProfile({email,name,picture});
            const token = await generateToken(user); 
            return res.status(201).send({token});
        }
    }
    catch(error){
        console.log(error.message);
        return res.status(401);
    }
}

exports.loginUser = async (req, res)=>{
    const {email, password} = req.body;
    try{
        const user = await verifyAndGetUser({email,password});
        const token = await generateToken(user);
        user.token = token;
        // res.cookie('token',token,{maxAge:60*60*24*7});
        res.status(200).send(user);
    }
    catch(error){
        console.log(error.message);
        res.status(401).json({message:"Invalid Email/Password"});
    }
}

exports.registerUser = async (req, res)=>{
    const {name,email,password} = req.body;

    try{
        await checkExistence(email);
        let user = await createUser({name,email,password});
        const token =  await generateToken(user);
        
        user.token = token;
        res.status(201).json(user);

    }catch(error)
    {
        console.log(error.message)
        res.status(400).json({message:error.message});
    }
}
exports.deleteUser = (req, res)=>{
    
}

exports.searchUser= async (req,res)=>{
    const {keyword} = req.params;
    const curr_user = req.user;

    try{
        const data = await findUsers({keyword,curr_user});
        res.status(201).send(data);
    }
    catch(error){
        console.log(error.message);
    }
}
