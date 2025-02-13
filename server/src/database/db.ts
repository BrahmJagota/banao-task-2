import mongoose from "mongoose";

const connectToDatabase = async ():Promise<void> => {
    try{
        await mongoose.connect(process.env.MONGODB_URI as string);
        console.log("connected to database")
    } catch(error) {
        console.log("error connecting with database", error);
        // process.exit(1);
    }
}

export default connectToDatabase;