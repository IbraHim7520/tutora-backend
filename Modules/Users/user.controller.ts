import { Request, Response } from "express"
import { userService } from "./user.service"

const getUserDataController = async(req: Request , res:Response ) =>{
    try {
        const userData = await userService.getLoggedinUser(req);
        if(userData?.id){
            res.status(200).send({
                success: true,
                userData
            })
        }
    } catch (error) {
        res.status(401).send({
            success : false,
            userData : null,
            error
        })
    }
}

export const userController = {
    getUserDataController
}