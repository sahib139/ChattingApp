const express = require("express");
const { Server } = require("socket.io");
const { createServer } = require("http"); 
const app = express();
const server = createServer(app);
const io = new Server();

const {PORT} = require("./config/server-config");


server.listen(PORT,()=>{
    console.log(`Server started at port ${PORT}`);
});
