const CrudRepository = require("./crud-repository");
const {Friend}  = require("../models/index");


class FriendRepository extends CrudRepository{

    constructor(){
        super(Friend);
    }

    async find(filter){
        try {
            const response = await Friend.findOne(filter);
            return response;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async userWithRoomAndNames(userId){
        try {
            const userInDetail = await Friend.findOne({userId}).populate({
                path:"rooms",
                populate:{
                    path:"users",
                }
            });
            return userInDetail;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async isRequestPending(from , to){
        try {
            const isRequestPending = await Friend.findOne({userId:from},'pendingRequest -_id');
            if(isRequestPending === null)return false;
            else return isRequestPending.pendingRequest.includes(to); 
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async getAllPendingRequest(userId){
        try {
            const pendingRequests = await Friend.find({userId},'pendingRequest');
            return pendingRequests;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async isFriend(from , to){
        try {
            const isFriend = await Friend.findOne({userId:from},'friends -_id');
            if(isFriend === null) return false;
            else return isFriend.friends.includes(to); 
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async getAllFriendRequest(userId){
        try {
            const friendRequest = await Friend.findOne({userId},'friendRequest -_id').populate({
                path:"friendRequest",
            });
            return friendRequest;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async isRequestReceived(from,to){
        try {
            const isTrue = await Friend.findOne({userId:from},'friendRequest');
            if(isTrue === null)return false;
            else return isTrue.friendRequest.includes(to);
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
}

module.exports=FriendRepository;