import { Request, Response, NextFunction } from "express";
import Friends from "../Models/Friends";

/**
 * @Tolfx
 */
export default async function SetGenerals(req: Request, res: Response, next: NextFunction)
{
    if(req.isAuthenticated())
    {
        //@ts-ignore
        res.locals.Friends = await Friends.find({ "googleIds.googleId": req.user.googleId, isFriends: true });
        //@ts-ignore
        res.locals.PendingFriends = await Friends.find({ "googleIds.googleId": req.user.googleId, pending: true });
    }

    res.locals.isAuth = req.isAuthenticated();

    //@ts-ignore
    res.locals.profilePicture = req.user?.profile_picture;
    //@ts-ignore
    res.locals.Name = req.user?.username;
    //@ts-ignore
    res.locals.Tag = req.user?.tag;
    //@ts-ignore
    res.locals.googleId = req.user?.googleId;

    next();
}