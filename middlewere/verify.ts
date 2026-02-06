
import { NextFunction, Request, Response } from "express"
import { auth } from "../lib/auth";
declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        email: string;
        role?: string;
      };
    }
  }
}

export const requireAuth = (...roles: string[])=>{
    return async(req: Request , res: Response, next:NextFunction)=>{
        
        try {
        const userSesion = await auth.api.getSession({
            headers:{
                cookie : req.headers.cookie || ""
            }
        })
       
        if(!userSesion || !userSesion.user){
            return res.status(401).send({
                success: false,
                message: "Unauthorized Access"
            })
        }
        const user = userSesion.user;

        if(roles.length > 0 && !roles.includes(user.role)){
            return res.status(403).send({
                success: false,
                message: "Forbidden Access"
            })
        }

        req.user = user;
        next();
        } catch (error) {
            console.log(error);
            return res.status(500).send({
                success: false,
                message: "Internal Server Error",
                error: error
            })
        }

    }
}