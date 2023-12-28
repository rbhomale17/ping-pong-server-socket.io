# Ping Pong Server with Socket.IO

## Overview
**This repository contains a simple implementation of a Ping Pong server using Socket.IO. The server and client communicate with each other using the Ping and Pong messages to ensure the connection is active.**

## Getting Started
### Prerequisites**
**Node.js and npm installed on your machine.**

### Installation
Clone the repository:

```terminal
git clone https://github.com/rbhomale17/ping-pong-server-socket.io.git
```

Navigate to the project directory:

```terminal
cd ping-pong-server-socket.io
```

### Install dependencies:

```terminal
npm install
```

## Usage
### Running the Server and Client

To run both the server and client simultaneously, use the following command:

```terminal
npm run test
```

This command starts the server on http://localhost:3000 and the client connects to the server.

## Server (index.js)
- The server is created using Express and Socket.IO.
- It listens on port 3000.
- Clients connect to the server, and a unique ID is assigned to each client with help of socket.id.
- The server emits a 'PING' message to the client upon connection and expects a 'PONG' message in return within 5 seconds to keep the connection alive.
- The server exposes an endpoint (/connectedClients) to get a list of connected client IDs.

## Client (client.js)

- The client connects to the server at http://localhost:3000.
- Upon connection, the client receives a 'PING' message from the server and responds with a 'PONG' message.
- To ensure the client remains active, it periodically sends 'PONG' messages to the server.
- The client handles disconnection and errors.

## API
### Server Endpoints
GET /: welcome message

```terminal
http://localhost:3000/
```

Retrieve a list of connected client IDs.

```terminal
{ "msg": "Welcome" }
```

GET /connectedClients: 

```terminal
http://localhost:3000/connectedClients
```

Retrieve a list of connected client IDs.

```terminal
{
  "connectedClients": [
    "wsIbEOlPtSYWHJxgAAAB",
    "wsIbEOlPtSYWHJxgAASD"
  ]
}
```

## Acknowledgments
The project uses Socket.IO for real-time communication.