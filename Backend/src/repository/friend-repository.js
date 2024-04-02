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

}

module.exports=FriendRepository;