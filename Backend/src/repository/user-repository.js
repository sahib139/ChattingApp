const {User} = require("../models/index");
const CrudRepository = require("./crud-repository");

class UserRepository extends CrudRepository{
    
    constructor(){
        super(User);
    }

    async getByEmail(email){
        try {
            const user = await User.findOne({email});
            return user;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async getAll(filter){
        try {
            const users = await User.find().skip(filter.offset).limit(filter.limit);
            return users;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
}

module.exports = UserRepository;
