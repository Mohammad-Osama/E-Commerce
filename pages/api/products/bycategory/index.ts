import { NextApiRequest, NextApiResponse } from "next"
import mongoose from "mongoose"
import { Product ,IProduct} from "../../../../models/productModel"


export async function controller(req: NextApiRequest, res: NextApiResponse) {
    try {
        const queryID = req.query.category as string
        const ObjectId = mongoose.Types.ObjectId
        const finalID = new ObjectId(queryID);
        const products = await Product.find({ category: finalID }).limit(3)
  
        res.status(200).json(products)
     } catch (error) {
        res.status(400).json(`Error==>${error}`);
     }
}