const express = require("express");
const app = express();
const {PORT} = require("./config/FrontendServer-config");

app.use(express.static(__dirname));
app.get("/",(req,res)=>{
    res.sendFile(__dirname+"/html/signIn.html");
})

app.listen(PORT, () => {
    console.log("server started at port no. "+PORT);
});
