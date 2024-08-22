import mongoose from "mongoose";
import { config } from "./config.js";

const connectDb = async () => {
  try {
    const connectionInstance = await mongoose.connect(config.databaseUrl);
    // console.log(connectionInstance);
    console.log(`MongoDb Database Connected Successfully`);
  } catch (error) {
    console.log("MONGOODB connection FAILED: ", error);
    process.exit(1);
  }
};

export default connectDb;
