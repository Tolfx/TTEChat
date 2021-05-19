import mongoose from "mongoose";

const FriendsSchema = new mongoose.Schema(
    {

        googleIds: {
            type: Array,
            required: true,
        },

        sentId: {
            type: String,
            required: true
        },

        isFriends: {
            type: Boolean,
            default: false
        },

        pending: {
            type: Boolean,
            default: true
        },

    }
);

const Friends = mongoose.model<any>("friends", FriendsSchema);

export default Friends;