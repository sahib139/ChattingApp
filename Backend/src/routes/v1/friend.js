const express = require("express");
const router = express.Router();

const {FriendControllers} = require("../../controllers/index");

router.get("/friendRequest/:id",FriendControllers.friendRequest);

module.exports=router;