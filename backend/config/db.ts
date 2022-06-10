import mongoose from "mongoose";
import colors from "colors"


 export async function connDb ()   {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI  as unknown as string )

        console.log(colors.cyan.underline(`Mongo db connected at : ${conn.connection.host as any}`))
    } catch (error) {
        console.log(colors.red.underline(`error happend : ${error}`.red))
        process.exit(1)
    }
    
}