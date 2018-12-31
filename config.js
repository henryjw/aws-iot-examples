const dotenv = require('dotenv')

dotenv.load()


module.exports = {
    host: process.env.HOST,
    secretKey: process.env.SECRET_KEY,
    accessKey: process.env.ACCESS_KEY,
}