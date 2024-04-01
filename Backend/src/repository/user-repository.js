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
}

module.exports = UserRepository;
