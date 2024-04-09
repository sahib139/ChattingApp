const dotenv =  require("dotenv");
const bcrypt = require("bcrypt");
dotenv.config();

module.exports={
    PORT : process.env.PORT,
    DB_URL : process.env.DB_URL,
    SALT : bcrypt.genSaltSync(10),
    SECRET_KEY : process.env.SECRET_KEY,
    RootPATH : process.env.RootPATH,
}