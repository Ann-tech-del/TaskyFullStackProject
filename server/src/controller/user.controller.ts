import { Request, Response } from "express";
import { client } from "../config/prismaConfig";

async function getUserProfile (req: Request, res: Response) {
  try {
    const { id } = req.user;
    
    const user = await client.user.findUnique({
      where: { id },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        username: true,
        dateJoined: true,
        lastProfileUpdate: true,
        avatar: true,
      }
    });
    
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    
    res.status(200).json(user);
  } catch (e) {
    console.error('Get profile error:', e);
    res.status(500).json({ message: "Something went wrong" });
  }
}

async function updateUserProfile (req: Request, res: Response) {
  try {
    const { id } = req.user;
    const { firstName, lastName, email, username, avatar } = req.body;
    
    
    if (email) {
      const existingEmail = await client.user.findFirst({
        where: {
          email,
          id: { not: id }
        }
      });
      if (existingEmail) {
        return res.status(400).json({ message: "Email already exists" });
      }
    }
    
    
    if (username) {
      const existingUsername = await client.user.findFirst({
        where: {
          username,
          id: { not: id }
        }
      });
      if (existingUsername) {
        return res.status(400).json({ message: "Username already exists" });
      }
    }
    
    const updatedUser = await client.user.update({
      where: { id },
      data: {
        firstName: firstName || undefined,
        lastName: lastName || undefined,
        email: email || undefined,
        username: username || undefined,
        avatar: avatar || undefined,
      },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        username: true,
        dateJoined: true,
        lastProfileUpdate: true,
        avatar: true,
      }
    });
    
    res.status(200).json(updatedUser);
  } catch (e) {
    console.error('Update profile error:', e);
    res.status(500).json({ message: "Something went wrong" });
  }
}
export {getUserProfile,updateUserProfile}