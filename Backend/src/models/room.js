const mongoose = require("mongoose");

const RoomSchema = new mongoose.Schema({
    roomName:{
        type:String,
    },
    users:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
        }
    ],
},{timestamps:true});

const Room = mongoose.model("Room",RoomSchema);

module.exports = Room;