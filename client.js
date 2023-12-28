const socketIOClient = require('socket.io-client'); // import socket.io-client module
const socket = socketIOClient('http://localhost:3000/'); // creating connection with server here

//if socket is connected to server 
socket.on('connect', () => {
    console.log('Connected to server from client side.');

    // getting PING message from server
    socket.on('PING', () => {
        console.log(`message recived from server : PING`);
        socket.send("PONG"); // sending PONG message to server;
    });

    // interval created for sending pong within 5 sec to ensure client is active
    let delay = 4500; // 4.5 sec delay
    setInterval(() => {
        console.log('Sending PONG to server');
        socket.send("PONG"); // pong sending
    }, delay) // delay is of 4.5 sec
});

// checking if client disconnected
socket.on('disconnect', () => {
    console.log('Client Connection Closed');
});

// handeling if error occured
socket.on('error', (error) => {
    console.log(`Socket.io error : ${error.message}`);
})