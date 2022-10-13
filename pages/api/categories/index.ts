import { NextApiRequest, NextApiResponse } from "next"
import { Category , ICategory } from "../../../models/categoryModel"
import clientPromise from "../../../lib/db"

export default async function handler(req: NextApiRequest, res: NextApiResponse){
  await clientPromise()
    try {
      

      const categories :ICategory[] =  await Category.find()

      res.status(200).json(categories)
     
    } catch (error) {
      res.status(400).json(`Error==>${error}`);
    }
   
    //  res.json("in get after find ressssss")

}
