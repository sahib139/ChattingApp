const {RoomRepository,UserRepository, FriendRepository} = require("../repository/index");

class RoomService{

    constructor(){
        this.roomRepository = new RoomRepository(); 
        this.friendRepository = new FriendRepository();
        this.userRepository = new UserRepository();
    }

    async createTwoPeopleRoom(userId1,userId2){
        try {
            const newRoom = await this.roomRepository.create({});

            const user1 = await this.userRepository.get(userId1);
            const user2 = await this.userRepository.get(userId2);

            newRoom.users.push(user1);
            newRoom.users.push(user2);

            const friendUser1 = await this.friendRepository.find({userId:userId1});
            const friendUser2 = await this.friendRepository.find({userId:userId2});


            await newRoom.save();
            
            friendUser1.rooms.push(newRoom);
            await friendUser1.save();
            
            friendUser2.rooms.push(newRoom);
            await friendUser2.save();

            return newRoom.id;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
    async createManyPeopleRoom(users){
        try {
            // To implement
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async destroyRoomOfTwo(userId1,userId2){
        try {
            const user1 = await this.userRepository.get(from);
            const user2 = await  this.userRepository.get(to);
            const roomId = await this.roomRepository.destroyRoomWithTwoUsers({user1,user2});
            return roomId;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async retrieveRoomsWithUserName(data){
        try {
            const response = await this.friendRepository.userWithRoomAndNames(data.id);
            // console.log("hey ->",response);
            if(response === null){
                return [];
            }
            const roomWithName = response.rooms.map((room) => {
                if (room.users.length > 2) {
                    return { roomId: room._id, name: room.name };
                } else {
                    const otherUser = room.users.find((user) => data.id !== user.id.toString());
                    if (otherUser) {
                        return { roomId: room._id, name: otherUser.name };
                    }
                }
                return null;
            }).filter((room) => room !== null);
            return roomWithName;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
}

module.exports = RoomService;