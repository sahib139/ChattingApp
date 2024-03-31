const signUp = async (req,res)=>{
    try {
        console.log(req.body);
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
        console.log(req.body);
        res.status(200).json({
            data:"ok",
            success:true,
            message:"logIn successfully",
            err:{},
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