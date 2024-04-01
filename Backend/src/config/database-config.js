const {DB_URL} = require("./server-config");
const mongoose = require("mongoose");

const DB_connect = async ()=>{
    await mongoose.connect(DB_URL);
}

module.exports={
    DB_connect,
}