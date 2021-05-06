import mongoose from "mongoose";
import UserInterface from "../Interfaces/User";

const FriendsSchema = new mongoose.Schema({

    googleId: {
        type: String,
        required: true,
    },

    friendGoogleId: {
        type: String,
        required: true
    },

    pending: {
        type: Boolean,
        required: false
    },

});

const Friends = mongoose.model<any>("friends", FriendsSchema);

export default Friends;