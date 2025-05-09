import mongoose from "mongoose";
import "dotenv/config";

const url = process.env.DB_URL;
const DbConnect = async () => {
  try {
    mongoose.connect(url);
    console.log("db connected");
  } catch (error) {
    console.log(error);
  }
};

export default DbConnect;
