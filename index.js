const express = require('express'); // Import express module
const importedSocketIO = require('socket.io');// Import socket.io module
const http = require('http'); // Import http module
const cors = require('cors'); // Import cors module
const port = 3000;// port to listen server;

const app = express(); // express app created
app.use(cors());

var connectedClients = {}; // object to store client ids and data;

// server connection;
var server = http.createServer(app); // server created by http;
var io = importedSocketIO(server);


io.on('connection', (socket) => {
    console.log(socket.id); // printing socketID of new client;
    let clientID = socket.id; // assign unique socket ID as clientID;
    connectedClients[clientID] = socket; // storing client data or ID in connectedClients object;

    console.log(`Client is connected : ${clientID}`); // logging after client joined;

    // emiting ping message initially
    // socket.emit('PING');

    // set ping interval to send / emit 'PING' after every 30 Seconds;
    let pingInterval = setInterval(() => {
        socket.emit('PING');
    }, 30000)

    // checking if PONG message is send by client or not;
    socket.on('message', (message) => {
        if (message == 'PONG') {
            console.log('messgae recived from client: ' + message)
            clearTimeout(pongTimeout); // clearing timeOut because PONG message recived (client is active)
        }
    });

    // Pong timeout if client dont send PONG withing 5 Sec client will be romoved from connectedClients;
    var pongTimeout = setTimeout(() => {
        socket.disconnect(true); // socket is dicontinued;
        console.log(`${clientID} is disconnected due to timeOut.`);
        delete connectedClients[clientID]; // removing client from connectedClient object;
    }, 5000);

    // checking if socket is disconnected or not
    socket.on('disconnect', () => {
        clearInterval(pingInterval); // clearing interval of PING (stop sending PING)
        console.log(`${clientID} is disconnected.`);
        delete connectedClients[clientID]; // client removed from connectedClients;
    })
})
app.get('/', (req, res) => {
    res.send({ msg: 'Welcome' })
});

// route to get connected clients Ids from express route  http://localhost:3000/connectedClients
app.get('/connectedClients', (req, res) => {
    let clientIdList = Object.keys(connectedClients); // creating array of ids and stooring it to varibale clientIdList
    res.send({ connectedClients: clientIdList }) // send response active ids of clients
})

// listen the server here
server.listen(port, () => {
    console.log(`Server is running on : http://localhost:${port}`) // listening server on port 3000;
})