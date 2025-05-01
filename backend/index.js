import express from "express";
import cors from "cors";
import { CLIENT_URL, PORT, connectDb } from "./config/config.js";
import doctorRoutes from "./routes/doctor.routes.js";


const app = express();

// Connect to the database
connectDb();

// Middlewares
app.use(express.json());
app.use(cors({ origin: CLIENT_URL }));

// health check route
app.get("/", (_, res) => {
  res.status(200).json({
    success: true,
    message: "server is up and running",
  });
});

// Define routes for doctors
app.use("/doctors", doctorRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
