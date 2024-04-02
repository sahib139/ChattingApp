const express = require("express");
const router = express.Router();
const {UserControllers} = require("../../controllers/index");
const { isAuthenticate } = require("../../middleware/Authenticate");

router.post("/singUp",UserControllers.signUp);
router.post("/logIn",UserControllers.logIn);
router.get("/users",isAuthenticate,UserControllers.getAll);
router.get("/users:id",isAuthenticate,UserControllers.get);

module.exports=router;