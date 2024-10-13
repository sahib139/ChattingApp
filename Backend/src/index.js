const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const cookieParser = require('cookie-parser');
const { Server } = require("socket.io");
const { createServer } = require("http");
const app = express();
const server = createServer(app);
const io = new Server(server,{
    cors: {
        origin: "http://localhost:3001",
        methods: "*",
        allowedHeaders: "*",
        credentials: true
    }
});

const { PORT} = require("./config/server-config");
const {DB_connect} = require("./config/database-config");
const {AppRoutes} = require("./routes/index");
const socketIo = require("./services/webSocket/socket");

app.use(cors({ origin:"http://localhost:3001" , credentials: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended:true}));

app.use("/api",AppRoutes);

server.listen(PORT, async () => {
    console.log(`Server started at port ${PORT}`);
    await DB_connect();
    console.log("Database Connected!");
    new socketIo(io);
});
