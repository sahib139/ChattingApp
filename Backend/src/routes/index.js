const express = require("express");
const router = express.Router();
const userRoutes = require("./v1/user");
const friendRouters = require("./v1/friend");
const chatRoutes = require("./v1/chat");
const roomRoutes = require("./v1/room");
const { isAuthenticate } = require("../middleware/Authenticate");

router.use("/v1",userRoutes);
router.use("/v1",isAuthenticate,friendRouters);
router.use("/v1",isAuthenticate,chatRoutes);
router.use("/v1",isAuthenticate,roomRoutes);

module.exports={
    AppRoutes : router,
}