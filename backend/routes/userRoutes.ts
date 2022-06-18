import express from "express"
import { registerUser } from "../controllers/userController"


const router = express.Router()

router.route("/register").post(registerUser)
 // router.route("/login").post(loginUser)  to be added later 
 // router.route("/:id").get(getUser).put(updateUser)  to be added later 



 export = router