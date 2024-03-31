const express = require("express");
const router = express.Router();
const {UserControllers} = require("../../controllers/index");

router.post("/singUp",UserControllers.signUp);
router.post("/logIn",UserControllers.logIn);

module.exports={
    userRoutes : router,
}