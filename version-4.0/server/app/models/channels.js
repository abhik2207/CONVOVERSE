import mongoose from "mongoose";

// Defining the schema for the 'channels' collection
const channelSchema = new mongoose.Schema({
    // Array of channel users with their information
    channelUsers: [
        {
            _id: { type: String, default: "" },
            name: { type: String, default: "" },
            profilePic: { type: String, default: "" }
        }
    ],
    // Array of messages in the channel
    messages: [
        {
            senderID: { type: String, default: "" },
            message: { type: String, default: "" },
            addedOn: { type: Number, default: Date.now() }
        }
    ],
    // Timestamp indicating when the channel was added
    addedOn: { type: Number, default: Date.now() }
});

// Defining instance methods for the channel schema
channelSchema.method({
    // Method to save channel data to the database
    saveData: async function() {
        return this.save()
    }
})

// Defining static methods for the channel schema
channelSchema.static({
    // Method to find multiple channels based on a query object
    findData: function(findObj) {
        return this.find(findObj)
    },
    
    // Method to find a single channel based on a query object
    findOneData: function(findObj) {
        return this.findOne(findObj)
    },

    // Method to find and update a channel based on query and update objects
    findOneAndUpdateData: function(findObj, updateObj) {
        return this.findOneAndUpdate(findObj, updateObj, {
            upsert: true,
            new: true,
            setDefaultsOnInsert: true
        })
    }
})

export default mongoose.model('channelSchema', channelSchema);