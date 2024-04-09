const express = require("express");
const router = express.Router();

const {ChatControllers} = require("../../controllers/index");

router.use("/retrieveChats",ChatControllers.retrieveChats)

module.exports=router;