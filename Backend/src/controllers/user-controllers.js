const UserService = require("../services/user-service");

const userService = new UserService();

const signUp = async (req,res)=>{
    try {
        await userService.signUp(req.body); 
        return res.status(200).json({
            data:"ok",
            success:true,
            message:"SignUp successfully",
            err:{},
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            data:{},
            success:false,
            message:"Unable to SignUp",
            err:error,
        });
    }
}

const logIn = async (req,res)=>{
    try {
        const token = await userService.logIn(req.body);
        res.cookie('token', token, {
            httpOnly: true, 
            secure: true,
            sameSite: 'Strict',
            expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),// 3 days
        });
        return res.status(200).json({
            token:token,
            success: true,
            message: "Login successful",
            err: {},
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            data:{},
            success:false,
            message:"Unable to logIn",
            err:error,
        });
    }
}

const get = async (req,res)=>{
    try {
        const user = await userService.get(req.params.id);
        return res.status(200).json({
            data:user,
            success:true,
            message:"User fetched successfully",
            err:{},
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            data:{},
            success:false,
            message:"Unable to get user",
            err:error,
        });
    }
}

const getAll = async (req,res)=>{
    try {
        const users = await userService.getAll(req.body);
        return res.status(200).json({
            data:users,
            success:true,
            message:"User fetched successfully",
            err:{},
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            data:{},
            success:false,
            message:"Unable to get users",
            err:error,
        });
    }
}

module.exports={
    signUp,
    logIn,
    get,
    getAll,
}