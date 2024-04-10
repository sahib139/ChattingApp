const jwt = require("jsonwebtoken");
const { SECRET_KEY } = require("../config/server-config");

const isAuthenticate = async (req,res,next)=>{
    try {
        const userToken = req.body.token;
        // const userToken = req.cookies.token;
        const response = jwt.verify(userToken,SECRET_KEY);
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