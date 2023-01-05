const router = require("./router/userRoutes");
const msgroute=require('./router/messageroute')
const body=require('body-parser')
const express = require('express');
const app = express();
const Mongoose=require('mongoose');
const cors=require('cors');
require('dotenv').config();
const socket=require('socket.io')

app.use(cors());
app.use(express.json());
app.use(body.urlencoded({extended:true}));

app.use('/api/auth',router)
app.use('/api/message',msgroute)


 
//mongoose connection  
Mongoose.set('strictQuery', true);
Mongoose.connect(process.env.Mongo,{
    useNewUrlParser:true,
    useUnifiedTopology:true
},()=>{
    console.log("Connected to Mongo");
});



//express connection
 const server=app.listen(process.env.PORT,()=>{
    console.log("server listening on port " + process.env.port)
})
const io = socket(server, {
    cors: {
      origin: "*",
      credentials: true,
    },
  });
  
   global.onlineUsers = new Map();
  io.on("connection", (socket) => {
    global.chatSocket = socket;
    socket.on("add-user", (userId) => {
      onlineUsers.set(userId, socket.id);
    });
  
    socket.on("send-msg", (data) => {
      const sendUserSocket = onlineUsers.get(data.to);
      if (sendUserSocket) {
        socket.to(sendUserSocket).emit("msg-recieve", data.message);
      }
    });
  });