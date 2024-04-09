const {ChatRepository} = require("../repository/index");

class ChatService{

    constructor(){
        this.chatRepository = new ChatRepository();
    }

    async createMessage(data){
        try { 
            await this.chatRepository.create({
                userId:data.userId,
                roomId:data.room,
                message:data.msg,
            });
            return true;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
    
    async retrieveMessages(filter){
        try {
            let chats = await this.chatRepository.findAllChats({roomId:filter.roomId});
            chats = chats.map((chat)=>{
                return {msg:chat.message,time:chat.updatedAt,user:chat.userId.name};
            });
            return chats;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
}

module.exports = ChatService;