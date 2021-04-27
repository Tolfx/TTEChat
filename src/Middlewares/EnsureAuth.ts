import { Request, Response, NextFunction } from "express";

/**
 * @Tolfx
 */
export default function EnsureAuth(req: Request, res: Response, next: NextFunction)
{
    if (req.isAuthenticated()) {
        return next();
    }
    
    req.flash("error_msg", "Please login to view this.");
    return res.redirect("/login");
}