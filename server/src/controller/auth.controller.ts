import { Request, Response } from "express";
import { client } from "../config/prismaConfig";
import bcrypt from 'bcryptjs'

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
export {registerUser}