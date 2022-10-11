import { NextApiRequest, NextApiResponse } from "next"
import mongoose from "mongoose"
import { Product ,IProduct} from "../../../models/productModel"
import clientPromise from "../../../lib/db"


export default async function controller(req: NextApiRequest, res: NextApiResponse) {
    clientPromise()
    if (req.method === 'POST') {
        try {
            const newProduct: IProduct = await Product.create({
            name: req.body.name,
            model: req.body.model,
            main_image: req.body.main_image,
            images: req.body.images,
            description: req.body.description,
            price: req.body.price,
            currency: req.body.currency,
            stock: req.body.stock,
            category: req.body.category,
            brand: req.body.brand,
            sale: req.body.sale,
            featured: req.body.featured
         })
         
   
         res.status(201).json(newProduct)}
         
      catch (error) {
         res.status(400).json(`Error==>${error}`);
      }
    }
    
     else {
        try {
            const page: number = parseInt(req.query.page as string) || 1
            const limit: number = 12
            const skip = (page - 1) * limit


            const products :IProduct[]= await Product.find().skip(skip).limit(limit)

            res.status(200).json(products)

        } catch (error) {
            res.status(400).json(`Error==>${error}`);
        }
    }

}