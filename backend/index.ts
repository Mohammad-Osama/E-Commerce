import express ,{Request,Response} from "express" 
import dotenv from "dotenv"


dotenv.config();

const app = express();
const port  = process.env.PORT || 5000;
app.listen(port, () :void => {
    console.log(`Server listening on ${port}`);
 });

 app.get ("/api/all" ,(req :Request , res : Response) =>{

    res.status(200).json({asd:"ssssss"})
 }
 
 )

