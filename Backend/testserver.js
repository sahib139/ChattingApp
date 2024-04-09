const express = require("express");
const app = express();
const { createServer } = require("http");
const { Server } = require("socket.io");
const server = createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*",
        methods: "*",
        allowedHeaders: "*",
        credentials: true
    }
});

io.on("connection", (socket) => {
    
});


server.listen(3001, () => {
    console.log("server started");
});
