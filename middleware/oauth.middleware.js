const axios = require('axios');

const oauth = async (req,res,next) =>{
    const {access_token} = req.body;
    
    try{

       const result = await axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${access_token}`,{
            headers: {
                Authorization: `Bearer ${access_token}`,
                Accept: 'application/json'
            }
        });
        const {name, email, picture} = result.data;
        req.body = {name,email,picture}
        next();

    } catch(error){
        console.log(error.messagae);
        res.status(401).json({message:'Authentication Failed'});
    }
}

module.exports = oauth;