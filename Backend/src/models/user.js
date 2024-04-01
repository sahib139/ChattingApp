const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {SALT,SECRET_KEY} = require("../config/server-config");

const UserSchema = new mongoose.Schema({
    name:{
        type:String,
        require:true,
    },
    email:{
        type:String,
        require:true,
        unique:true,
    },
    password:{
        type:String,
        require:true,
    }
},{timestamps:true});

UserSchema.pre("save",function encryption(next){
    const encryptedPassword = bcrypt.hashSync(this.password,SALT);
    this.password = encryptedPassword;
    next();
});

UserSchema.methods.comparePassword = function comparePassword(password){
    return bcrypt.compareSync(password,this.password);
} 

UserSchema.methods.genToken = function genToken(){
    return jwt.sign(
        {id:this.id,email:this.email},
        SECRET_KEY,
        {expiresIn:'3d'}
    );
}

const User = mongoose.model("User",UserSchema);

module.exports = User;