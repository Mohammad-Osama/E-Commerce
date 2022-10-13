import { NextApiRequest, NextApiResponse } from "next"
import mongoose from "mongoose"
import { User, IUser } from "../../../../models/userModel"
import { generateToken } from "../../../../helpers/generateToken"
import bcrypt from "bcryptjs"
import clientPromise from "../../../../lib/db"


export default async function controller(req: NextApiRequest, res: NextApiResponse) {
    await clientPromise()
    if (req.method === 'POST') {
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
            res.status(400).json(`Error==>${error}`);
        }

    }
    else
        res.status(400).json(`wrong method  `);
}