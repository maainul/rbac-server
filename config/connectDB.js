import mongoose from "mongoose";
import { logger } from "../middleware/logMiddleware.js";

const connectDB = async () => {
  try {
    logger.info("Trying to Connect Mongo DB ....".bgYellow.bold);
    const CT = process.env.CONNECTION_STRING || process.env.MONGO_LOCAL_URL;
    const conn = await mongoose.connect(CT);
    logger.info(
      `Conneted To Mongodb Databse ${conn.connection.host}`.bgMagenta.white
    );
  } catch (error) {
    logger.info(`Errro in Mongodb ${error}`.bgRed.white);
  }
};

export default connectDB;
