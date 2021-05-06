import mongoose from "mongoose";
import UserInterface from "../Interfaces/User";

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
    },

    friends: {
        type: Array,
        required: false
    },

});

const User = mongoose.model<UserInterface>("users", UserSchema);

export default User;