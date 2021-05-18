import mongoose from "mongoose";

const FriendsSchema = new mongoose.Schema(
    {

        googleIds: {
            type: Array,
            required: true,
        },

        pending: {
            type: Boolean,
            required: true
        },

    }
);

const Friends = mongoose.model<any>("friends", FriendsSchema);

export default Friends;