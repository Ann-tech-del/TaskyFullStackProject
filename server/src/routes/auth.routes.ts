import { Router } from "express";
import { registerUser,logInUser } from "../controller/auth.controller";
import { verifyUserInformation,verifyPasswordStrength,checkUserNameAndPasswordReuse } from "../mildware/verifyUserInfo";

const authRouter = Router()


authRouter.post(
  "/register",verifyUserInformation, checkUserNameAndPasswordReuse,verifyPasswordStrength, registerUser)
  authRouter.post("/login",logInUser )

  export default authRouter;