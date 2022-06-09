import express ,{Request,Response} from "express" 
import dotenv from "dotenv"


dotenv.config();

const app = express();
const port  = process.env.PORT || 5000;
app.listen(port, () :void => {
    console.log(`Server listening on ${port}`);
 });

 app.use("/api/products",require("./routes/productsRoute"))

