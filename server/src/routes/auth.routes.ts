import { Router } from "express";
import { registerUser,logInUser,updateUser, updatePassword } from "../controller/auth.controller";
import { verifyUserInformation,verifyPasswordStrength,checkUserNameAndPasswordReuse } from "../mildware/verifyUserInfo";
import verifyUser from "../mildware/verifyUser";

const authRouter = Router()


authRouter.post(
  "/register",verifyUserInformation, checkUserNameAndPasswordReuse,verifyPasswordStrength, registerUser)
  authRouter.post("/login",logInUser )
  authRouter.put("/profile", verifyUser, updateUser);
  authRouter.put("/password",verifyUser,updatePassword)

  export default authRouter;