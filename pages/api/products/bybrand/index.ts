import { NextApiRequest, NextApiResponse } from "next"
import mongoose from "mongoose"
import { Product ,IProduct} from "../../../../models/productModel"


export default async function controller(req: NextApiRequest, res: NextApiResponse) {
    try {
        const queryID = req.query.brand as string
        const ObjectId = mongoose.Types.ObjectId
        const finalID = new ObjectId(queryID);
        const products = await Product.find({ brand: finalID }).limit(6)
  
        res.status(200).json(products)
     } catch (error) {
        res.status(400).json(`Error==>${error}`);
     }
}