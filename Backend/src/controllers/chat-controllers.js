const {ChatService} = require("../services/index");

const chatService = new ChatService();

const retrieveChats = async (req,res)=>{ 
    try {
        const chats = await chatService.retrieveMessages({roomId:req.query.roomId});
        return res.status(200).json({
            data:chats,
            success:true,
            message:"Successfully retrieve the chats",
            err:{},
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            data:{},
            success:false,
            message:"failed to retrieve chats",
            err:error,
        });
    }
}

module.exports={
    retrieveChats,
}