import express from "express" 
import dotenv from "dotenv"
import colors from "colors"
import {connDb} from "./config/db"


dotenv.config();

connDb() 

const app = express();

app.use(express.json())
app.use(express.urlencoded({extended:false}))

const port  = process.env.PORT || 5000;

 
app.listen(port, () :void => {
    console.log(`Server listening on ${port}`);
 });

 app.use("/api/products",require("./routes/productsRoute"))

