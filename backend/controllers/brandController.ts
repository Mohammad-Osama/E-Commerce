import {Request,Response} from "express"
import { Brand , IBrand } from "../models/brandModel"


// all brands  
export async function getBrands(req :Request , res : Response)  {
    const brands  = await Brand.find()
 
     res.status(200).json(brands)
  }


// new brand 
export async function addBrand(req :Request , res : Response)  {
    const newBrand : IBrand = await Brand.create({
      name: req.body.name ,   
      description: req.body.description,
      logo: req.body.logo,
    })

   res.status(200).json(newBrand)
}