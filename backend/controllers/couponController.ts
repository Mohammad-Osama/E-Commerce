import {Request,Response} from "express"
import { Coupon , ICoupon } from "../models/couponModel"


// all coupons  
export async function getCoupons(req :Request , res : Response)  {
    const coupons  = await Coupon.find()
 
     res.status(200).json(coupons)
  }


// new coupon 
export async function addBrand(req :Request , res : Response)  {
    const newCoupon : ICoupon = await Coupon.create({
      name: req.body.name ,   
      value: req.body.value,
    })

   res.status(201).json(newCoupon)
}