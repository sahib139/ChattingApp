const mongoose = require("mongoose");

const FriendSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        require:true,
    },
    friends:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
        }
    ],
    friendRequest:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
        }
    ],
    pendingRequest:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
        }
    ],
    rooms:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Room",
        }
    ]
},{timestamps:true});

const Friend = mongoose.model("Friend",FriendSchema);

module.exports = Friend;