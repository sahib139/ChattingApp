const {User} = require("../models/index");
const CrudRepository = require("./crud-repository");

class UserRepository extends CrudRepository{
    
    constructor(){
        super(User);
    }

    
    async get(id){
        try {
            const user = await User.findById(id).select('-password');
            return user;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
    
    async getWithPassword(id){
        try {
            const user = await User.findById(id).select('-password');
            return user;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async getByEmailWithPassword(email){
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
            const users = await User.find({name:{ $regex: new RegExp(filter.name, 'i') }},'name _id').skip(filter.offset).limit(filter.limit).select('-password');
            console.log(users); 
            return users;
        } catch (error) {
            console.log(error);
            throw error;
        } 
    }

}

module.exports = UserRepository;
