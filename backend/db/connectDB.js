import mongoose from "mongoose";


export const connectDB = async ()=>{
    try{
      const conn = await mongoose.connect(process.env.MONOGO_URI)
      console.log(`MonogoDB connected:${conn.connection.host}`)
    }catch(error){
        console.error(`Error:${error.message}`)
        process.exit(1);
    }
}

export default connectDB;