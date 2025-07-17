import { Router } from "express";
import { registerUser } from "../controller/auth.controller";
import { verifyUserInformation,verifyPasswordStrength,checkUserNameAndPasswordReuse } from "../mildware/verifyUserInfo";
const authRouter = Router()


authRouter.post(
  "/register",verifyUserInformation, checkUserNameAndPasswordReuse,verifyPasswordStrength, registerUser)

  export default authRouter;