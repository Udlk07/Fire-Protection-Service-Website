import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
    fname:{
        type: String,
        required: true
    },
    lname:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    feedback:{
        type: String,
        required: true
    },

    rating:{
        type: String,
        required: true
    },

    team:{
        type: String,
        required: true
    },


})


export default mongoose.model("User", userSchema);