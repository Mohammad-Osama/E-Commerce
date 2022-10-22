import { NextApiRequest, NextApiResponse } from "next"
import mongoose from "mongoose"
import { Product ,IProduct} from "../../../../models/productModel"
import clientPromise from "../../../../lib/db"


export default async function controller(req: NextApiRequest, res: NextApiResponse) {
   clientPromise()
    if (req.method === 'PUT') {
        const id = req.query.id as string
   const existingProduct: IProduct | null = await Product.findById(id)

   if (!existingProduct) {
      res.status(400)
      throw new Error("Product not found")
   }
   else {
      try {
         const updatedProduct: IProduct | null = await Product.findByIdAndUpdate(
            id, req.body, { returnDocument: "after" }
         )

         res.status(200).json(updatedProduct)
      } catch (error) {

         res.status(400).json(`Error==>${error}`);
      }

   }
    }
    else if (req.method === 'DELETE')
    {
        res.status(200).json({ message: `delete product with id ${req.query.id as unknown as number}` })
    }
    
     else {
        try {
            const id= req.query.id as string
            const product = await Product.findById(id)
      
            res.status(200).json(product)
         } catch (error) {
            res.status(400).json(`Error==>${error}`);
         }
    }
}