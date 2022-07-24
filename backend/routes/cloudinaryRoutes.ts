import express from "express"
import { getCloudnarySignature } from "../controllers/cloudinaryController"

const router = express.Router()

router.route("/").get(getCloudnarySignature)

export = router