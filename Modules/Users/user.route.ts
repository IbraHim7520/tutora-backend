import { Router } from "express";
import { userController } from "./user.controller";
import { requireAuth } from "../../middlewere/verify";

const userRouter  = Router();

userRouter.get("/user", userController.getUserDataController)
userRouter.get("/user-analytics", requireAuth("admin", "student", "teacher") ,userController.userAnalyticsController)


//post teaching session as a teacher
// userRouter.post("/post-session", userController.postTeachingSessionController )
userRouter.get("/get-all-teacher", userController.getAllTeacherController)


userRouter.get("/getsessions/:teacherId" , userController.getSessionController)


userRouter.put("/update-profile", requireAuth("student" , "teacher", "admin"), userController.updateProfileController);

userRouter.get("/all-users", requireAuth("admin") ,userController.allUsers)




export default userRouter;