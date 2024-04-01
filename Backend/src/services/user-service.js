const {UserRepository} = require("../repository/index");

class UserService{

    constructor(){
        this.userRepository = new UserRepository();
    }
    
    async signUp(data){
        try {
            const user = await this.userRepository.create(data);
            return true;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async logIn(data){
        try {
            const user = await this.userRepository.getByEmail(data.email);
            if(!user){
                throw "No user Found!";
            }
            if(!user.comparePassword(data.password)){
                throw "Password Incorrect";
            }
            const token = user.genToken();
            return token;
        } catch (error) {   
            console.log(error);
            throw error;
        }
    }
}

module.exports = UserService;