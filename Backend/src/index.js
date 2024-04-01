const express = require("express");
const bodyParser = require("body-parser");
const { Server } = require("socket.io");
const { createServer } = require("http");
const app = express();
const server = createServer(app);
const io = new Server(server);


const { PORT,RootPATH } = require("./config/server-config");
const {DB_connect} = require("./config/database-config");
const {AppRoutes} = require("./routes/index");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.use(express.static(RootPATH+"/Frontend"));
app.use(AppRoutes);

io.on("connection", (socket) => {
    console.log("A user connected with ID:", socket.id);
});

server.listen(PORT, async () => {
    console.log(`Server started at port ${PORT}`);
    await DB_connect();
    console.log("Database Connected!");
});
