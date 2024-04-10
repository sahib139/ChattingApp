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

const allPendingRequests = async (req,res)=>{
    try {
        const response = await friendService.pendingRequests(req.user.id);
        return res.status(200).json({
            data:response,
            success:true,
            message:"Successfully fetch all pending Request",
            err:{},
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            data:{},
            success:false,
            message:"failed to fetch pending Requests",
            err:error,
        });
    }
}

const allFriendRequests = async (req,res)=>{
    try {
        const response = await friendService.friendRequests(req.user.id);
        return res.status(200).json({
            data:response,
            success:true,
            message:"Successfully fetch all friend Request",
            err:{},
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            data:{},
            success:false,
            message:"failed to fetch friend Requests",
            err:error,
        });
    }
}

const isRequestPending = async (req,res)=>{
    try {
        const response = await friendService.isRequestPending(req.user.id,req.params.id);
        return res.status(200).json({
            data:response,
            success:true,
            message:"Successfully got information about pending Request",
            err:{},
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            data:{},
            success:false,
            message:"unable to get information about pending Request",
            err:error,
        });
    }      
}

const isFriend = async (req,res)=>{
    try {
        const response = await friendService.isFriend(req.user.id,req.params.id);
        return res.status(200).json({
            data:response,
            success:true,
            message:"Successfully got information about isFriend",
            err:{},
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            data:{},
            success:false,
            message:"Unable to get information about isFriend",
            err:error,
        });
    }      
}

const isRequestReceived = async (req,res)=>{
    try {
        const response = await friendService.isRequestReceived(req.user.id,req.params.id);
        return res.status(200).json({
            data:response,
            success:true,
            message:"Successfully got information about FriendShip",
            err:{},
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            data:{},
            success:false,
            message:"Unable to get information about FriendShip",
            err:error,
        });
    }   
}

module.exports={
    friendRequest,
    manageFriendRequest,
    unFriend,
    allPendingRequests,
    allFriendRequests,
    isRequestPending,
    isFriend,
    isRequestReceived,
}