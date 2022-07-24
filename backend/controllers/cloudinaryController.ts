import cloudinary from "cloudinary"
import {Request,Response} from "express"

const cloud = cloudinary.v2
export async function getCloudnarySignature(req :Request , res : Response)  {
    try{
        const timestamp=Math.round((new Date).getTime()/1000);
        const signature =cloud.utils.api_sign_request(
                    {timestamp:timestamp,},
                    process.env.API_SECRET as unknown as string );

        const api_key=process.env.API_KEY 
        res.status(200).json({signature,timestamp ,api_key });
    }catch(error){
        res.status(400).json(`Error==>${error}`);
    }
  }