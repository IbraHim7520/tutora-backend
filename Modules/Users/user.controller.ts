import { ErrorRequestHandler, Request, Response } from "express"
import { userService } from "./user.service"

declare global {
  namespace Express {
    interface Request {
      user?: { id: string; role: string };
    }
  }
}

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



const getAllTeacherController = async(req: Request , res: Response) =>{
    try {
        const response = await userService.getAllTeacher()
        if(response.length>0){
            res.status(200).send({
                success: true,
                data : response
            })
        }else{
            res.status(404).send({
                success : true,
                data : []
            })
        }
    } catch (error: any ) {
        res.status(500).send({
            success: false,
            data: []
        })
        console.log(error.message)
    }
}

const getSessionController = async(req: Request , res:Response) =>{
    const {teacherId} = req.params;
    try {
       const sessions = await userService.getSessions(teacherId as string)
               if(sessions.length>0){
            res.status(200).send({
                success: true,
                data : sessions
            })
        }else{
            res.status(404).send({
                success : true,
                data : []
            })
        }
    } catch (error: any) {
         res.status(500).send({
            success: false,
            data: []
        })
        console.log(error.message)
    }
}


const userAnalyticsController = async (req: Request, res: Response) => {
  try {
    
    const role = req.user?.role as string;
    const id = req.user?.id as string;
    if (!id || !role) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized: user not found in request",
      });
    }
    const response = await userService.getUserAnalytics(id, role);
    return res.status(200).json({
      success: true,
      data: response,
    });
  } catch (error: any) {
    console.error("User Analytics Error:", error);
    return res.status(500).json({
      success: false,
      message: error?.message || "Internal Server Error",
    });
  }
};




const updateProfileController = async (req: Request, res: Response) => {
  try {
    const { name, email, image } = req.body;

    const updatedUser = await userService.updateProfile(req, {
      name,
      email,
      image,
    });

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      data: updatedUser,
    });
  } catch (error: any) {
    console.error("Update Profile Error:", error);
    res.status(500).json({
      success: false,
      message: error?.message || "Profile update failed",
    });
  }
};

const allUsers  = async(req:Request, res:Response)=>{
    try {
        const myId = req.user?.id as string
        const result = await userService.allUsersList(myId) 
        res.status(200).send({
            success: true,
            data: result
        })
    } catch (error) {
    res.status(500).send({
      success: false,
      message: error || "Profile update failed",
    });
    }
}


export const userController = {
    getUserDataController,
    getAllTeacherController,
    getSessionController,
    userAnalyticsController,
    updateProfileController,
    allUsers
    

}