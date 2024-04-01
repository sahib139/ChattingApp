const mongoose = require("mongoose");

const ChatSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        require:true,
    },
    roomId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Room",
        require:true,
    },
    content:{
        type:String,
        require:true,
    }
},{timestamps:true});

const Chat = mongoose.model("Chat",ChatSchema);

module.exports = Chat;