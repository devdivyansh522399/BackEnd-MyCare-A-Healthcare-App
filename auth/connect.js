import mongoose  from "mongoose";
import dotenv from "dotenv";
dotenv.config();
const connectDB = async () => {
  try {
    const url = `mongodb+srv://${process.env.USER}:${process.env.PASSWORD}@cluster0.d7d2bfa.mongodb.net/${process.env.DB}`;
    await mongoose.connect(url);
    console.log("Database is connected...");
  } catch (error) {
    console.log(`Error : ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
