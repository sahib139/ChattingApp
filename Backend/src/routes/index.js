const express = require("express");
const router = express.Router();
const userRoutes = require("./v1/user");
const friendRouters = require("./v1/friend");
const { isAuthenticate } = require("../middleware/Authenticate");

router.use("/v1",userRoutes);
router.use("/v1",isAuthenticate,friendRouters);

module.exports={
    AppRoutes : router,
}