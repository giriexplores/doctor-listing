import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

// Define constants for configuration
const PORT = process.env.PORT;
const DB_URL = process.env.DB_URL;
const CLIENT_URL = process.env.CLIENT_URL;

// Function to connect to the MongoDB database
const connectDb = () => {
  mongoose
    .connect(`${DB_URL}/doctorsDb`)
    .then(() => {
      console.log("DB connected successfully");
    })
    .catch((err) => {
      console.log("DB connection failed", err.message);
      process.exit(1); // Exit process with failure
    });
};

export { PORT, DB_URL, CLIENT_URL, connectDb };
