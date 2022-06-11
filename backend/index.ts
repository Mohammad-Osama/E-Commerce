import express from "express" 
import dotenv from "dotenv"
import colors from "colors"
import cors from "cors"
import {connDb} from "./config/db"


dotenv.config();

connDb() 

const app = express();
app.use(cors()) ;
app.use(express.json())
app.use(express.urlencoded({extended:false}))

const port  = process.env.PORT || 5000;

 
app.listen(port, () :void => {
    console.log(`Server listening on ${port}`);
 });

 app.use("/api/products",require("./routes/productRoutes"))
 app.use("/api/brands",require("./routes/brandRoutes"))
 app.use("/api/categories",require("./routes/categoryRoutes"))



