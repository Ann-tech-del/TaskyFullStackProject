import { Router } from "express";
import { registerUser,logInUser,updateUser } from "../controller/auth.controller";
import { verifyUserInformation,verifyPasswordStrength,checkUserNameAndPasswordReuse } from "../mildware/verifyUserInfo";
import verifyUser from "../mildware/verifyUser";

const authRouter = Router()


authRouter.post(
  "/register",verifyUserInformation, checkUserNameAndPasswordReuse,verifyPasswordStrength, registerUser)
  authRouter.post("/login",logInUser )
  authRouter.put("/profile", verifyUser, updateUser);

  export default authRouter;