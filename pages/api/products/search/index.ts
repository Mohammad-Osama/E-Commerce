import { NextApiRequest, NextApiResponse } from "next"
import mongoose from "mongoose"
import { Product, IProduct } from "../../../../models/productModel"
import clientPromise from "../../../../lib/db"


export default async function controller(req: NextApiRequest, res: NextApiResponse) {
    await clientPromise()
    const queryName = req.query.name 
    try {
        const products :IProduct[] = await Product.find({
            "name": { "$regex": `${queryName}`, '$options': 'i' },
        }).limit(10)

        res.status(200).json(products)

    } catch (error) {
        res.status(400).json(`Error==>${error}`);
    }

}