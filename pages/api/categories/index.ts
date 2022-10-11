import { NextApiRequest, NextApiResponse } from "next"
import { Category , ICategory } from "../../../models/categoryModel"
import clientPromise from "../../../lib/db"

export default async function handler(req: NextApiRequest, res: NextApiResponse){
    try {
      console.log("file starteddddd")
       clientPromise()
     
      
      
      
      const categories :ICategory[] =  await Category.find()
  
      // console.log("in get after find")
      // console.log("categoriesssssssss" , categories)
      res.status(200).json(categories)
      console.log("in get after send")
    } catch (error) {
      console.log("errorrrrrrrrrrrrr" ,error)
    }
   
    //  res.json("in get after find ressssss")

}
