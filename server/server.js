const express = require ("express") ;
const http = require('http');
const socketServer = require( "./socket"); 
const routes = require( './routes');
const dotenv = require('dotenv');
const connectDB = require('./config/db.config');
const cors = require('cors');
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



httpServer.listen(8000,()=>{
    console.log('listening on port 8000');
});