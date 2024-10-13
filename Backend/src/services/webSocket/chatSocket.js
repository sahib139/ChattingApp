const {extractFromPayload} = require("../../utils/socketPayload");
const {ChatService} = require("../../services/index");
const chatService = new ChatService();

class ChatSocket{
    constructor({io,socket}){
        this.io = io;
        this.socket = socket;
        socket.on("joinRoom",(payload)=>{
            try {
                const response = extractFromPayload(payload);
                socket.join(response.room);
            } catch (error) {
                console.error("Error joining room:", error);
            }
        });
        socket.on("message",(payload)=>{
            try {
                const response = extractFromPayload(payload);
                chatService.createMessage(response);
                this.io.to(response.room).emit("userMessage", {name:response.userName,msg:response.msg});
            } catch (error) {
                console.error("Error processing message:", error);
            }
        });
    }
      
}

module.exports = ChatSocket;