const express = require("express");
const router = express.Router();


router.get("/",(req,res)=>{
    res.sendFile(RootPATH+"/Frontend/index.html");
})

module.exports={
    AppRoutes : router,
}