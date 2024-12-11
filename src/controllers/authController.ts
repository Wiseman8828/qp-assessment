import { Request, RequestHandler, Response } from "express";
import jwt from "jsonwebtoken"
import User from "../models/User"
const { v4: uuidv4 } = require('uuid');

export const signup:any = async (req: Request, res: Response) => {
  const { name, email, password, isAdmin } = req.body

  try {
    const existingUser = await User.findOne({ where: { email } })
    if (existingUser) {
      return res.status(400).json({ error: "User already exists" })
    }

    const user = await User.create({id: uuidv4(), name, email, password, isAdmin })

    return res.status(201).json({
      message: "User registered successfully",
      user: { id: user.id, name: user.name, email: user.email, isAdmin: user.isAdmin },
    })
  } catch (error: any) {
    return res.status(500).json({ error: "Something went wrong", details: error.message })
  }
}


export const login:any = async (req: Request, res: Response) => {
  const { email, password } = req.body

  try {
    const user = await User.findOne({ where: { email } })
    if (!user) {
      return res.status(404).json({ error: "User not found" })
    }

    const isPasswordValid = await user.comparePassword(password)
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid credentials" })
    }

    const token = jwt.sign({ id: user.id, email: user.email, name: user.name, isAdmin: user.isAdmin },
      process.env.JWT_SECRET!,
      { 
        expiresIn: "1h",
        algorithm: 'HS256',
      }
    )

    return res.status(200).json({
      message: "Login successful",
      token,
      user: { id: user.id, name: user.name, email: user.email, isAdmin: user.isAdmin },
    })
  } catch (error: any) {
    return res.status(500).json({ error: "Something went wrong", details: error.message })
  }
}
