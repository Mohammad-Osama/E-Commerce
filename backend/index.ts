import express from "express" 
import dotenv from "dotenv"
import cors from "cors"
import {connDb} from "./config/db"
import producRoutes from "./routes/productRoutes"
import brandRoutes from "./routes/brandRoutes"
import categoryRoutes from "./routes/categoryRoutes"
import userRoutes from "./routes/userRoutes"
import reviewRoutes from "./routes/reviewRoutes"
import cloudinaryRoutes from "./routes/cloudinaryRoutes"
import path from "path"

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
 app.use('/api/reviews',reviewRoutes)
 app.use('/api/cloudnarysignature',cloudinaryRoutes)

 // {..} to go one level up from dist folder,which is created after the build using tsc
 // to fix reloading , to direct to the html file 
 // maybe add -->   if  (process.env.NODE_ENV === 'production')  ?!?!
 app.get('/*', function(req, res) {
    res.sendFile(path.join(__dirname, '../build/index.html'), function(error) {
    if (error) {
       // console.log("error" , error)
        res.status(500).send(error)
    }
    })
})
 