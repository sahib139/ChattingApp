const express = require("express");
const router = express.Router();
const {FriendControllers} = require("../../controllers/index");
const { isAuthenticate } = require("../../middleware/Authenticate");

router("/friendRequest:id",FriendControllers.friendRequest);

module.exports=router;