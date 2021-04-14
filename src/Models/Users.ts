import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({

});

const User = mongoose.model("users", UserSchema);

export default User;