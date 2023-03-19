const express = require ("express") ;
const http = require('http');
const socketServer = require( "./socket"); 
const routes = require( './routes');
const dotenv = require('dotenv');
const connectDB = require('./config/db.config');
const cors = require('cors');
const path = require('path');
// const  cookieParser = require('cookie-parser');
dotenv.config();

connectDB();

const app = express();
app.use(express.json());

// app.use(cookieParser());
app.use(cors({
    origin: ['http://localhost:5000',"http://localhost:3000"],
    credentials:true
}));

const httpServer = http.createServer(app);
socketServer(httpServer);


app.use('/api',routes);

if(process.env.NODE_ENV==="production"){
    app.use(express.static(path.resolve(__dirname,'client','build')));
    app.get("*",(req,res)=>{
        res.status(200).sendFile(path.resolve(__dirname,'client','build','index.html'));
    })
}

httpServer.listen(process.env.PORT,()=>{
    console.log(`listening on port ${process.env.PORT}`);
});