const mongoose = require("mongoose");

const RoomSchema = new mongoose.Schema({
    RoomId:{
        type:String,
        require:true,
    },
    Users:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
        }
    ],
},{timestamps:true});

const Room = mongoose.model("Room",RoomSchema);

module.exports = Room;