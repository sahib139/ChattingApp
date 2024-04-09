const {SECRET_KEY} = require("../config/server-config");
const jwt = require("jsonwebtoken");

function extractFromPayload(payload){
    try {
        const room = payload.roomId;
        const msg = payload.msg;
        const token = payload.authToken;
        const decoded = jwt.verify(token, SECRET_KEY);
        const userId = decoded.id;
        const name = decoded.name;
        return {room:room,msg:msg,userId:userId,userName:name};
    } catch (error) {
        console.log(error);
        throw error;
    }
}

module.exports = {
    extractFromPayload,
}