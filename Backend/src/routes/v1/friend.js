const express = require("express");
const router = express.Router();

const {FriendControllers} = require("../../controllers/index");

router.get("/sendFriendRequest/:id",FriendControllers.friendRequest);
router.get("/manageFriendRequest/:id/:value",FriendControllers.manageFriendRequest);
router.get("/unFriend/:id",FriendControllers.unFriend);
router.get("/getAllPendingRequest",FriendControllers.allPendingRequests);
router.get("/friendRequests",FriendControllers.allFriendRequests);
router.get("/isRequestPending/:id",FriendControllers.isRequestPending);
router.get("/isFriend/:id",FriendControllers.isFriend);
router.get("/isRequestReceived/:id",FriendControllers.isRequestReceived);

module.exports=router;