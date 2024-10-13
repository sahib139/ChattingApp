const express = require("express");
const https = require("https");  
const fs = require("fs");       
const app = express();
const {PORT} = require("./config/FrontendServer-config");

const options = {
  key: fs.readFileSync("./key.pem"),
  cert: fs.readFileSync("./cert.pem")
};

app.use(express.static(__dirname));
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/html/chatPage.html");
});

https.createServer(options, app).listen(PORT, () => {
  console.log("HTTPS server started at port " + PORT);
});