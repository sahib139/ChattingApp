const {FriendRepository,UserRepository} = require("../repository/index");

class FriendService {

    constructor(){
        this.friendRepository = new FriendRepository();
        this.userRepository = new UserRepository();
    }

    async sendRequest(from,to){
        try {
            const fromRequest = await this.userRepository.get(from);
            const toRequest = await  this.userRepository.get(to);
            var friend = await this.friendRepository.find({id:toRequest.id});
            if(!friend){
                friend = await this.friendRepository.create({userId:toRequest.id}); 
            } 
            friend.friendRequest.push(fromRequest.id);
            await friend.save();
            return true;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
}

module.exports = FriendService;