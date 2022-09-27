import express from "express"
import { getAllUsers, currentUser, loginUser, registerUser } from "../controllers/userController"
import { authJwt } from "../middleware/authMiddleware"


const router = express.Router()

router.route("/register").post(registerUser)
router.route("/login").post(loginUser)   
router.route("/profile").get( authJwt , currentUser )
router.route("/all").get( authJwt , getAllUsers )
 // router.route("/:id").get(getUser).put(updateUser)  to be added later 



 export = router