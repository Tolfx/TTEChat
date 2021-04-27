import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({

    username: {
        type: String,
        required: true,
    },

    tag: {
        type: String,
        required: false
    },

    profile_picture: {
        type: String,
        required: false,
    },

    phone: {
        type: String,
        required: false,
    },

    googleId: {
        type: String,
        required: true,
    }

});

const User = mongoose.model("users", UserSchema);

export default User;