import { NextApiRequest, NextApiResponse } from "next"
import mongoose from "mongoose"
import { Product, IProduct } from "../../../../models/productModel"


export async function controller(req: NextApiRequest, res: NextApiResponse) {
    const queryName = req.query.name as any
    try {
        const products = await Product.find({
            "name": { "$regex": `${queryName}`, '$options': 'i' },
        }).limit(10)

        res.status(200).json(products)

    } catch (error) {
        res.status(400).json(`Error==>${error}`);
    }

}