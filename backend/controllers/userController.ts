import {Request,Response} from "express"
import { User , IUser } from "../models/userModel" 




export async function registerUser(req :Request , res : Response)  {
   
    const newUser : IUser = await User.create({
      first_name: req.body.first_name ,
      last_name: req.body.last_name,
      email: req.body.email,
      password: req.body.password,   
      birthday: req.body.birthday,
      phone: req.body.phone,
      country: req.body.country,
      address: req.body.address,
    })


   res.status(200).json(  ({data:
                            {id :newUser.id,
                            first_name :newUser.first_name,
                            last_name:newUser.last_name,
                            email:newUser.email,
                            status:newUser.status
                                    }}))
}