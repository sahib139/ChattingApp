const express = require("express");
const router = express.Router();
const {userRoutes} = require("./v1/user");

router.get("/",(req,res)=>{
    res.sendFile(RootPATH+"/Frontend/index.html");
})
router.use("/v1",userRoutes);

module.exports={
    AppRoutes : router,
}