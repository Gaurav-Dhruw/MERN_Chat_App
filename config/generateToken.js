const jwt = require('jsonwebtoken');

exports.generateToken= (user) =>{
    const {_id,name,email,picture} = user;
    token = jwt.sign({_id,name,email,picture},'super-secret-key');
    return token;
}
