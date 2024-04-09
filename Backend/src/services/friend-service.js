const  RoomService  = require("./room-service");
const {FriendRepository,UserRepository} = require("../repository/index");

class FriendService {

    constructor(){
        this.friendRepository = new FriendRepository();
        this.userRepository = new UserRepository();
        this.roomService = new RoomService();
    }

    async sendRequest(from,to){
        try {
            const fromRequest = await this.userRepository.get(from);
            const toRequest = await  this.userRepository.get(to);
            var friend = await this.friendRepository.find({userId:toRequest.id});
            if(!friend){
                friend = await this.friendRepository.create({userId:toRequest.id}); 
            } 
            if(friend.friendRequest.includes(fromRequest.id)){
                return new Error("Already send the friend request!");
            }
            friend.friendRequest.push(fromRequest.id);
            await friend.save();
            return true;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async manageFriendRequest(to,from,toAcceptRequest){
        try {
            const fromRequest = await this.userRepository.get(from);
            const toRequest = await  this.userRepository.get(to);

            const friendTo = await this.friendRepository.find({userId:toRequest.id});

            if(!friendTo.friendRequest.includes(fromRequest.id)){
                return new Error("Friend request not exist!");
            }

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
                this.roomService.createTwoPeopleRoom(fromRequest.id,toRequest.id);

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
            
            // const roomId = await this.roomService.destroyRoomOfTwo(from,to);
            
            
            // if deletion of room is required while doing unfriend then also delete room id from user model of user. 
            
            // const user1 = await this.userRepository.get(to);
            // const user2 = await this.userRepository.get(from);
            // user1.rooms = user1.rooms.filter((id)=>{
            //     return id.toString() !== roomId;
            // });
            // user1.save();
            // user2.rooms = user2.rooms.filter((id)=>{
            //     return id.toString() !== roomId;
            // });
            // user2.save();

            return true;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
}

module.exports = FriendService;