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

export {registerUser,logInUser }