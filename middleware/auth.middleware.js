const jwt = require('jsonwebtoken');


const auth=(req,res,next)=>{

    if(req.originalUrl==='/api/user/signup' || req.originalUrl==='/api/user/login' || req.originalUrl==='/api/user/oauth'){
        return next();
    }
    // console.log(req.headers);
    const token = req.headers.authorization.split(' ')[1];

    if(!token) return res.status(401).json({message:'Not Authorized'});


    jwt.verify(token,'super-secret-key',(err,decoded)=>{
        if(decoded){
            req.user = decoded;
            next();
        }
        else{
            res.status(401).json({message:'Not Authorized'});
        }
    });
    
    
}

module.exports = auth;