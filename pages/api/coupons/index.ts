import { NextApiRequest, NextApiResponse } from "next"
import mongoose from "mongoose"
import { Coupon , ICoupon} from "../../../models/couponModel"
import clientPromise from "../../../lib/db"
import { authJwt, CustomRequest } from "../../../middlewareFunctions/authMiddleware"

export default async function controller(req: NextApiRequest, res: NextApiResponse) {
    await clientPromise()
    await authJwt(req, res)
    const currentUser = ((req as CustomRequest).user)
    const role = currentUser.role
    const code = req.body.code

    if (req.method === 'POST') {
        if (code !== process.env.SECRET_CODE) {
            res.status(400).json("code doesnt match")
        }
        else {
            if (role === "admin") {
                try {
                    const newCoupon : ICoupon = await Coupon.create({
                        name: req.body.name ,   
                        value: req.body.value,
                      })

                    res.status(201).json(newCoupon)
                }

                catch (error) {
                    res.status(400).json(`Error==>${error}`);
                }
            }
            else {
                res.status(400).json("not an admin");
            }
        }
    }

    else {   // to be changed later 
        try {
            const coupons  = await Coupon.find()
 
             res.status(200).json(coupons)

        } catch (error) {
            res.status(400).json(`Error==>${error}`);
        }
    }
    /* if (req.method === 'POST') {
        try {
            const newCoupon : ICoupon = await Coupon.create({
                name: req.body.name ,   
                value: req.body.value,
              })
          
             res.status(201).json(newCoupon)}
         
      catch (error) {
         res.status(400).json(`Error==>${error}`);
      }
    }
    
     else {
        try {
            const coupons  = await Coupon.find()
 
     res.status(200).json(coupons)

        } catch (error) {
            res.status(400).json(`Error==>${error}`);
        }
    } */

}
