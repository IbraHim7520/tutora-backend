import { Router } from "express";
import { userController } from "./user.controller";

const userRouter  = Router();

userRouter.get("/user", userController.getUserDataController )


export default userRouter;