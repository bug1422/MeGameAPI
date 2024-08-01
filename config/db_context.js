const { default: mongoose } = require("mongoose")
const MongoStore = require('connect-mongo');


const connectDB = async (uri) => {
    try {
        await mongoose.connect(uri, {
            authSource: "admin",
            connectTimeoutMS: 5000,
            socketTimeoutMS: 20000,
            heartbeatFrequencyMS: 10000,
            retryWrites: true,
        })
        console.log("Connected to DB")
    }
    catch(e){
        console.error("Error connecting to DB" + e)
        process.exit(1)
    }
}

const createMongoStore = (uri) => {
    return new MongoStore({ mongoUrl: uri, client: mongoose.connection.getClient() })
}
module.exports = {
    connectDB,
    createMongoStore
}