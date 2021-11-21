require('dotenv').config();
const express = require('express');
const socket = require('socket.io');
const path = require('path');


//express app setup
const app = express();

//static files
app.use(express.static(path.join(__dirname, "static")));

//server setup
const port = process.env.PORT || 8080;
const server = app.listen(port, ()=>{
    console.log(`connected at port ${port}...`);
});

//socket setup
const io = socket(server);
io.on('connection', (socket)=>{
    console.log(`connection established on ${socket.id}`);

    //handle chat event
    socket.on('chat', (data)=>{
        console.log(data);
        io.sockets.emit('display', data);
    });

    //handle typing event
    socket.on('typing', (data)=>{
        socket.broadcast.emit('typingView', data);
    });
});


