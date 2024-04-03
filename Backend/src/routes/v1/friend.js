const express = require("express");
const router = express.Router();

const {FriendControllers} = require("../../controllers/index");

router.get("/friendRequest/:id",FriendControllers.friendRequest);
router.get("/manageFriendRequest/:id/:value",FriendControllers.manageFriendRequest);
router.get("/unFriend/:id",FriendControllers.unFriend);

module.exports=router;