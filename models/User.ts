import mongoose from "mongoose";

// Mongoose uses schemas to enforce structure, validation, and types at the application level.
// Think of it as the architect's drawing before you start building the actual house
const userSchema = new mongoose.Schema({
 email:{
    type: String,
    required: true,
    unique: true,
 },
    password: {
        type: String,
        required: true,
    },

})

export default mongoose.models.User ||  mongoose.model("User" , userSchema)