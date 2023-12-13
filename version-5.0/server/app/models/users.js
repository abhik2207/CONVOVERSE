import mongoose from "mongoose";

// Defining the schema for the 'users' collection
const userSchema = new mongoose.Schema({
    name: { type: String, default: "" },
    phoneNumber: { type: Number, default: "" },
    password: { type: String, default: "" },
    profilePic: { type: String, default: "" },
    addedOn: { type: Date, default: Date.now() }
});

// Defining instance methods for the user schema
userSchema.method({
    // Method to save user data to the database
    saveData: async function() {
        return this.save()
    }
})

// Defining static methods for the user schema
userSchema.static({
    // Method to find multiple users based on a query object
    findData: function(findObj) {
        return this.find(findObj)
    },
    
    // Method to find a single user based on a query object
    findOneData: function(findObj) {
        return this.findOne(findObj)
    },
    
    // Method to find and update a user based on query and update objects
    findOneAndUpdateData: function(findObj, updateObj) {
        return this.findOneAndUpdate(findObj, updateObj, {
            upsert: true,
            new: true,
            setDefaultsOnInsert: true
        })
    }
})

export default mongoose.model('úserSchema', userSchema);