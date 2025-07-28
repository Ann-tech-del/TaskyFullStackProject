import { Request, Response } from "express";
import { client } from "../config/prismaConfig";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

async function registerUser (req: Request, res: Response) {
    try {
      const { firstName, lastName, username, email, password ,avatar} = req.body;
      const hashedPassword = await bcrypt.hash(password, 10);
      await client.user.create({
        data: {
          firstName,
          lastName,
          username,
          email,
          password: hashedPassword,
          avatar: avatar || '',
        },
      });
      res.status(201).json({ Message: "User created successfully" });
    } catch (e) {
      res.status(500).json({ Message: "Something went wrong" });
    }
}

async function logInUser (req:Request,res:Response){
  try{
    const {identifier,password} =req.body
    const user = await client.user.findFirst({
      where:{
        OR: [ {username:identifier},{email:identifier}]
      }
    })
    if (!user){
      res.status(400).json({mesage:'wrong log in credentials'})
      return
    }
    const passwordMatch = await bcrypt.compare(password,user.password)
    if (passwordMatch === false) {
      res.status(400).json({message:'wrong log in credentials'})
      return
    }
    const {password:userPassword , dateJoined,lastProfileUpdate, ...userDetails} = user
     const token = jwt.sign(userDetails,process.env.JWT_SECRET!)
     res.cookie("authToken",token).json(userDetails)
  }
    catch(e){ 
       res.status(500).json({ Message: "Something went wrong" });
    } 
}

async function updateUser(req: Request, res: Response) {
  try {
    const { id } = req.user;
    const { firstName, lastName, email, avatar } = req.body;
    const updatedUser = await client.user.update({
      where: { id },
      data: {
        firstName: firstName || undefined,
        lastName: lastName || undefined,
        email: email || undefined,
        avatar: avatar || undefined,
      },
    });
    res.status(200).json({ message: "User updated successfully", user: updatedUser });
  } catch (e) {
    res.status(500).json({ message: "Something went wrong" });
  }
}
async function updatePassword (req: Request, res: Response) {
  try {
    const { id } = req.user;
    const { currentPassword, newPassword } = req.body;
    
    
    const user = await client.user.findUnique({
      where: { id }
    });
    
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    
    
    const passwordMatch = await bcrypt.compare(currentPassword, user.password);
    if (!passwordMatch) {
      return res.status(400).json({ message: "Current password is incorrect" });
    }
    
    
    const hashedNewPassword = await bcrypt.hash(newPassword, 10);
    
    
    await client.user.update({
      where: { id },
      data: {
        password: hashedNewPassword
      }
    });
    
    res.status(200).json({ message: "Password updated successfully" });
  } catch (e) {
    console.error('Update password error:', e);
    res.status(500).json({ message: "Something went wrong" });
  }
}


export {registerUser,logInUser,updateUser,updatePassword}