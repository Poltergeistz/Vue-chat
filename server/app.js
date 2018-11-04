// Modules
const express = require('express');
const app = express();

// Server PORT
const server = app.listen(3001, () => {
    console.log('server running on port 3001');
});

// Socket IO
const io = require('socket.io')(server);

// USER NUMBER & CONNECTIONS
let users = [];
let connections = [];

// ON CONNECT
io.on('connection', (socket) => {

    // CHeck if the app is mounted
    socket.on('MOUNTED', (data) => {
        // emit event to myself
        io.emit('MOUNTED', data)
    })

    console.log(`SOCKET ID : ${socket.id}`);

    // GET THE LIST OF USERS
    socket.on('LIST_OF_USERS', (data) => {
        console.log(`DATA from LIST OF USERS : ${data}`)
        users = data
        console.log(`LIST OF USERS : ${users}`)
    })

    // Connected USERS
    socket.emit('CONNECTED_USERS', Object.keys(io.sockets.connected).length)
    connections.push(socket).length
    console.log('Connected : %s User connected', connections.length);

    // TYPING
    socket.on('TYPING', (data) => {
        socket.broadcast.emit('TYPING', data)
        console.log(`TYPING : ${data}`)
    })

    // STOP_TYPING
    socket.on('STOP_TYPING', (data) => {
        socket.broadcast.emit('STOP_TYPING', data)
        console.log(`STOP_TYPING : ${data}`)
    })

    // JOINED
    socket.on('JOINED', (data) => {
        console.log(`JOINED THE CHAT : ${data}`)
        socket.broadcast.emit('JOINED', data)
    })

    // LEAVED
    socket.on('LEAVED', (data) => {
        console.log(`LEAVED THE CHAT : ${data}`)
        socket.broadcast.emit('LEAVED', data)
    })

    // ON DISCONNECT
    socket.on('disconnect', () => {
    // Splice Users from Array
    users.splice(users.indexOf(socket.username), 1);
    connections.splice(connections.indexOf(socket), 1);
    socket.broadcast.emit(`${socket.id} disconnected`);
    console.log('Disconnected : %s User disconnected', connections.length);
    });

    /* LISTEN SEND_MESSAGE from the client and emit it from here (server)
    to the client again */
    socket.on('SEND_MESSAGE', (data) => {
        io.emit('MESSAGE', data)
    });
});




