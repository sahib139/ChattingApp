const { Chat } = require("../models/index");
const CrudRepository = require("./crud-repository");

class ChatRepository extends CrudRepository{
    
    constructor(){
        super(Chat);
    }

    async findAllChats(filter){
        try {
            const messages = await Chat.find(filter).populate("userId");
            return messages;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
}

module.exports = ChatRepository;