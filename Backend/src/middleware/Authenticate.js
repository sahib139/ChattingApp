const jwt = require("jsonwebtoken");
const { SALT } = require("../config/server-config");

const isAuthenticate = async (req,res,next)=>{
    try {
        const userToken = req.cookies.token;
        const response = jwt.verify(userToken,SALT);
        req.user = response;
        next();
    } catch (error) {
        console.log(error);
        return res.status(401).json({
            success:false,
            message:"Unauthorized Access!",
            err:error,
        });
    }
}

module.exports={
    isAuthenticate,
}