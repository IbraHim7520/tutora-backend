import { Request } from "express"
import { auth } from "../../lib/auth"

const getLoggedinUser = async(req : Request ) =>{
    const cookie = req.headers.cookie || ""
    const session = await auth.api.getSession({
        headers: {cookie},
    })
    return session?.user
}


export const userService = {
    getLoggedinUser
}