import { NextApiRequest, NextApiResponse } from "next"
import { Brand, IBrand } from "../../../models/brandModel"
import clientPromise from "../../../lib/db"
import { authJwt, CustomRequest } from "../../../middlewareFunctions/authMiddleware"


export default async function controller(req: NextApiRequest, res: NextApiResponse) {
    await clientPromise()
    await authJwt(req, res)
    const currentUser = ((req as CustomRequest).user)
    const role = currentUser.role
    const code = req.body.code

    if (req.method === 'POST') {
        if (code !== process.env.SECRET_CODE) {
            res.status(400).json("code doesnt match")
        }
        else {
            if (role === "admin") {
                try {
                    const newBrand: IBrand = await Brand.create({
                        name: req.body.name,
                        description: req.body.description,
                        logo: req.body.logo,
                    })

                    res.status(201).json(newBrand)
                }

                catch (error) {
                    res.status(400).json(`Error==>${error}`);
                }
            }
            else {
                res.status(400).json("not an admin");
            }
        }
    }

    else {
        try {
            const brands: IBrand[] = await Brand.find()

            res.status(200).json(brands)

        } catch (error) {
            res.status(400).json(`Error==>${error}`);
        }
    }

}
