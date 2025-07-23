import { Router } from "express";
const userRouter = Router()
import verifyUser from "../mildware/verifyUser";
import { getUserProfile,updateUserProfile } from "../controller/user.controller";


userRouter.get("/user", verifyUser, getUserProfile)
userRouter.put("/user", verifyUser, updateUserProfile)

export default userRouter