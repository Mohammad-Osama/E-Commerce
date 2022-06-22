import express from "express" 
import dotenv from "dotenv"
import cors from "cors"
import {connDb} from "./config/db"
import producRoutes from "./routes/productRoutes"
import brandRoutes from "./routes/brandRoutes"
import categoryRoutes from "./routes/categoryRoutes"
import userRoutes from "./routes/userRoutes"

dotenv.config();

connDb() 

const app = express();
app.use(cors()) ;
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(express.static('build'))
const port  = process.env.PORT || 5000;

 
app.listen(port, () :void => {
    console.log(`Server listening on ${port}`);
 });

 app.use("/api/products",producRoutes)
 app.use("/api/brands",brandRoutes)
 app.use("/api/categories",categoryRoutes)
 app.use("/api/users",userRoutes)


