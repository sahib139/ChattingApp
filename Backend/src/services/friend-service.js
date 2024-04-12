const RoomService = require("./room-service");
const { FriendRepository, UserRepository } = require("../repository/index");

class FriendService {

    constructor() {
        this.friendRepository = new FriendRepository();
        this.userRepository = new UserRepository();
        this.roomService = new RoomService();
    }

    async sendRequest(from, to) {
        try {
            const fromRequest = await this.userRepository.get(from);
            const toRequest = await this.userRepository.get(to);

            var fromFriend = await this.friendRepository.find({ userId: fromRequest });
            if (!fromFriend) {
                fromFriend = await this.friendRepository.create({ userId: fromRequest });
            }
            if (fromFriend.pendingRequest.includes(toRequest.id)) {
                return new Error("Already send the friend request!");
            }
            fromFriend.pendingRequest.push(toRequest);
            await fromFriend.save(); // created a pending request;

            var toFriend = await this.friendRepository.find({ userId: toRequest.id });
            if (!toFriend) {
                toFriend = await this.friendRepository.create({ userId: toRequest.id });
            }
            toFriend.friendRequest.push(fromRequest);
            toFriend.save(); // done asynchronously
            // send the request to other user

            return true;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async manageFriendRequest(to, from, toAcceptRequest) {
        try {
            const fromRequest = await this.userRepository.get(from);
            const toRequest = await this.userRepository.get(to);

            const friendTo = await this.friendRepository.find({ userId: toRequest.id });

            const friendFrom = await this.friendRepository.find({ userId: fromRequest.id });

            if (!friendTo || !friendFrom) {
                throw new Error("no friend related document exists!!");
            }

            if (!friendFrom.pendingRequest.includes(toRequest.id) || !friendTo.friendRequest.includes(fromRequest.id)) {
                return new Error("Friend request not exist!");
            }

            friendFrom.pendingRequest = friendFrom.pendingRequest.filter((id) => {
                return (id.toString() !== toRequest.id);
            });

            friendTo.friendRequest = friendTo.friendRequest.filter((id) => {
                return (id.toString() !== fromRequest.id);
            });



            if (toAcceptRequest.toLowerCase() === 'yes') {
                friendTo.friends.push(fromRequest);

                friendFrom.friends.push(toRequest);

                await friendFrom.save();

                // now async create a message room for them
                this.roomService.createTwoPeopleRoom(fromRequest.id, toRequest.id);

            }

            await friendTo.save();
            await friendFrom.save();

            return true;

        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async unFriend(from, to) {
        try {
            const friendTo = await this.friendRepository.find({ userId: to });
            const friendFrom = await this.friendRepository.find({ userId: from });

            friendTo.friends = friendTo.friends.filter((id) => {
                return (id.toString() !== from);
            });

            friendFrom.friends = friendFrom.friends.filter((id) => {
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

    async isRequestPending(from, to) {
        try {
            const isRequestPending = await this.friendRepository.isRequestPending(from, to);
            return isRequestPending;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async pendingRequests(id) {
        try {
            const allPendingRequests = await this.friendRepository.getAllPendingRequest(id);
            return allPendingRequests;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async isFriend(from, to) {
        try {
            const isFriend = await this.friendRepository.isFriend(from, to);
            return isFriend;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async friendRequests(id) {
        try {
            let allFriendRequests = await this.friendRepository.getAllFriendRequest(id);
            if(allFriendRequests === null)return [];
            allFriendRequests = allFriendRequests.friendRequest.map((friend)=>{
                return {id:friend.id,name:friend.name};
            });
            return allFriendRequests;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async isRequestReceived(from, to) {
        try {
            const isRequestReceived = await this.friendRepository.isRequestReceived(from, to);
            return isRequestReceived;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
}

module.exports = FriendService;