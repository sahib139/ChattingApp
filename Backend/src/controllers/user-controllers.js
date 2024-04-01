const UserService = require("../services/user-service");

const userService = new UserService();

const signUp = async (req,res)=>{
    try {
        await userService.signUp(req.body); 
        res.status(200).json({
            data:"ok",
            success:true,
            message:"SignUp successfully",
            err:{},
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            data:{},
            success:false,
            message:"Unable to SignUp",
            err:error,
        });
    }
}

const logIn = async (req,res)=>{
    try {
        const token = userService.logIn(req.body);
        res.cookie('token', token, {
            httpOnly: true,
            secure: true,
            sameSite: 'Strict',
            expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),// 3 days
        });
        res.status(200).json({
            success: true,
            message: "Login successful",
            err: {},
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            data:{},
            success:false,
            message:"Unable to logIn",
            err:error,
        });
    }
}

module.exports={
    signUp,
    logIn,
}