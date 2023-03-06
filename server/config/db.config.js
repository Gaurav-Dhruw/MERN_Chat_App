const mongoose = require('mongoose');

const connectDB = async()=>{
    try{
        mongoose.set('strictQuery',true);
        const result = await mongoose.connect(process.env.MONGODB_URI,{
            useNewUrlParser:true,
            useUnifiedTopology:true,
        });

        console.log(`DB connected: ${result.connection.host}`);

    }catch(error){
        console.log(error.message);
    }
}

module.exports = connectDB;