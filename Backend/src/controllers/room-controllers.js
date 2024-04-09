const {RoomService} = require("../services/index");

const roomService = new RoomService();

const retrieveRoom = async (req,res)=>{
    try {
        const chats = await roomService.retrieveRoomsWithUserName(req.user);
        return res.status(200).json({
            data:chats,
            success:true,
            message:"Successfully retrieve room with username",
            err:{},
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            data:{},
            success:false,
            message:"failed to retrieve room with username",
            err:error,
        });
    }
}

module.exports={
    retrieveRoom,
}