import { Request, Response } from "express"
import { User, IUser } from "../models/userModel"
import bcrypt from "bcryptjs"
import { generateToken } from "../helpers/generateToken"
import { CustomRequest } from "../middleware/authMiddleware"

export async function registerUser(req: Request, res: Response) {
  const { email, password } = req.body

  try {
    const userExists = await User.findOne({ email })
    if (userExists) {
      res.status(400).json("user already exists")
    }
    else {
      const salt = await bcrypt.genSalt(10)
      const hashedPassword = await bcrypt.hash(password, salt)

      const newUser: IUser = await User.create({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        password: hashedPassword,
        birthday: req.body.birthday,
        phone: req.body.phone,
        country: req.body.country,
        address: req.body.address,
      })
      if (newUser) {
        const token = generateToken(newUser.id)
        res.status(201).json({
          id: newUser.id,
          first_name: newUser.first_name,
          last_name: newUser.last_name,
          email: newUser.email,
          role: newUser.role,
          token: token
        })
      }
      else {
        res.status(400).json("something wrong happened")
      }
    }
  } catch (error) {
    res.status(400).json(`Error ==> ${error}`)
  }

}

export async function loginUser(req: Request, res: Response) {
  try {
    const { email, password } = req.body
    const userExists = await User.findOne({ email })
    if (userExists) {
      const matched = await bcrypt.compare(password, userExists.password)
      if (matched === true) {
        const token = generateToken(userExists.id)
        res.status(201).json({
          id: userExists.id,
          first_name: userExists.first_name,
          last_name: userExists.last_name,
          email: userExists.email,
          role: userExists.role,
          token: token
        })

      }
      else {
        res.status(400).json("wrong password")

      }
    }
    else {
      res.status(400).json("user does not exist")
    }

  } catch (error) {
    res.status(400).json(`Error ==> ${error}`)
  }

}

export async function currentUser(req: Request, res: Response) {
  try {
    // from authjwt middelware 
    const currentUser = ((req as CustomRequest).user)
    // console.log(currentUser)
    res.status(200).json(currentUser)

  } catch (error) {
    res.status(400).json(`Error ==> ${error}`)
  }

}

export async function getAllUsers(req: Request, res: Response) {
  try {
    // from authjwt middelware 
    const currentUser = ((req as CustomRequest).user)
      if (currentUser?.role === "admin") {
       const users  = await User.find().select(['-password', '-__v' ])
       res.status(200).json(users)
      }
      else {
        res.status(400).json("Not authorized user")
      }

  } catch (error) {
    res.status(400).json(`Error ==> ${error}`)
  }

}