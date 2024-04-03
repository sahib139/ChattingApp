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
            var friend = await this.friendRepository.find({userId:toRequest.id});
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

    async manageFriendRequest(from,to,toAcceptRequest){
        try {
            const fromRequest = await this.userRepository.get(from);
            const toRequest = await  this.userRepository.get(to);
            const friendTo = await this.friendRepository.find({userId:toRequest.id});

            friendTo.friendRequest = friendTo.friendRequest.filter((id)=>{
                return (id.toString() !== fromRequest.id);
            });

            if(toAcceptRequest.toLowerCase() ==='yes'){
                friendTo.friends.push(fromRequest);

                var friendFrom = await this.friendRepository.find({userId:fromRequest.id});
                if(!friendFrom){
                    friendFrom = await this.friendRepository.create({userId:fromRequest.id}); 
                }  
                friendFrom.friends.push(toRequest);

                await friendFrom.save();

                // now async create a message room for them
            }

            await friendTo.save();
            
            return true;

        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async unFriend(from,to){
        try {
            const friendTo = await this.friendRepository.find({userId:to});
            const friendFrom = await this.friendRepository.find({userId:from});

            friendTo.friends = friendTo.friends.filter((id)=>{
                return (id.toString() !== from);
            });
            friendFrom.friends = friendFrom.friends.filter((id)=>{
                return (id.toString() !== to);
            });

            await friendTo.save();
            await friendFrom.save();
            
            // async delete their room.

            return true;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
}

module.exports = FriendService;