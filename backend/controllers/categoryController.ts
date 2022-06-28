import {Request,Response} from "express"
import { Category , ICategory } from "../models/categoryModel"


// all category  
export async function getCategories(req :Request , res : Response)  {
    const categories  = await Category.find()
 
     res.status(200).json(categories)
  }


// new categories 
export async function addCategory(req :Request , res : Response)  {
    const newCategory : ICategory = await Category.create({
      name: req.body.name ,   
      description: req.body.description,
      logo: req.body.logo,
    })

   res.status(201).json(newCategory)
}