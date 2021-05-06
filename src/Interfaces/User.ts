import { Document } from "mongoose";

export default interface UserInterface extends Document
{
    username: string,
    tag: string,
    profile_picture: string,
    phone: string,
    googleId: string,
}