import { NextApiRequest, NextApiResponse } from "next"
import { Brand , IBrand } from "../../../models/brandModel"
import clientPromise from "../../../lib/db"


export default async function controller(req: NextApiRequest, res: NextApiResponse) {
   await clientPromise()
    if (req.method === 'POST') {
        try {
            const newBrand : IBrand = await Brand.create({
                name: req.body.name ,   
                description: req.body.description,
                logo: req.body.logo,
              })
          
             res.status(201).json(newBrand)}
         
      catch (error) {
         res.status(400).json(`Error==>${error}`);
      }
    }
    
     else {
        try {
            const brands :IBrand[]  = await Brand.find()
 
            res.status(200).json(brands)

        } catch (error) {
            res.status(400).json(`Error==>${error}`);
        }
    }

}
