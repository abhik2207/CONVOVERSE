import mongoose from "mongoose";

// MongoDB connection URL
const DB_CONNECTION_URL = 'mongodb://127.0.0.1:27017/convoverse';

// Function to connect to the MongoDB database
const connectDB = () => {
    console.log(`-- Database is trying to connect on ${new Date()} --`);
    const options = {
        // keepAlive: true,
        // autoReconnect: true,
        // poolSize: 10,
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }
    return mongoose.connect(DB_CONNECTION_URL, options);
}

export default connectDB;