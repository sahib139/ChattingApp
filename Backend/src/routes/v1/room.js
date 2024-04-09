const express = require("express");
const router = express.Router();

const {RoomControllers} = require("../../controllers/index");

router.use("/friendsList",RoomControllers.retrieveRoom)

module.exports=router;