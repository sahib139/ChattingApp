const {FriendService} = require("../services/index");

const friendService = new FriendService();

const friendRequest = async (req,res)=>{
    try {
        const response = await friendService.sendRequest(req.user.id,req.params.id);
        return res.status(200).json({
            data:response,
            success:true,
            message:"Successfully send the Friend Request",
            err:{},
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            data:{},
            success:false,
            message:"failed to send the Friend Request",
            err:error,
        });
    }
}

const manageFriendRequest = async (req,res)=>{
    try {
        const response = await friendService.manageFriendRequest(req.user.id,req.params.id,req.params.value);
        return res.status(200).json({
            data:response,
            success:true,
            message:"Successfully managed the request",
            err:{},
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            data:{},
            success:false,
            message:"failed to managed the Friend Request",
            err:error,
        });
    }
}

const unFriend = async (req,res)=>{
    try {
        const response = await friendService.unFriend(req.user.id,req.params.id);
        return res.status(200).json({
            data:response,
            success:true,
            message:"Successfully unFriended",
            err:{},
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            data:{},
            success:false,
            message:"failed to unFriend",
            err:error,
        });
    }
}

module.exports={
    friendRequest,
    manageFriendRequest,
    unFriend,
}