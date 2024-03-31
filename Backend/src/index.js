const express = require("express");
const bodyParser = require("body-parser");
const { Server } = require("socket.io");
const { createServer } = require("http");
const app = express();
const server = createServer(app);
const io = new Server(server);


const { PORT,RootPATH } = require("./config/server-config");
const {AppRoutes} = require("./routes/index");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(RootPATH+"/Frontend"));
app.use(AppRoutes);

io.on("connection", (socket) => {
    console.log("A user connected with ID:", socket.id);
});

server.listen(3000, () => {
    console.log(`Server started at port ${PORT}`);
});
