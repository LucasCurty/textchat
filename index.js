require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path')
const socket = require('socket.io');

app.use(cors());
app.use("/", express.static(path.join(__dirname, 'build')));


const server = app.listen( process.env.PORT || 3001,()=>{
    console.log("SERVER RUNNING");
});

const io = socket(server);


io.on("connection", (socket)=>{
    console.log(` User connected : ${socket.id}`);


    socket.on("join_room",(data)=>{
        socket.join(data);
        console.log(`User with ID: ${socket.id} joined room: ${data}`)
    })

    socket.on("send_message", (data)=>{
        socket.to(data.room).emit('receive_message', data)
    })

    socket.on("disconnect", ()=>{
        console.log("User Disconnected", socket.id);
    })

})