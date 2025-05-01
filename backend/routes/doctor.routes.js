import { addDoctor, getDoctors } from "../controllers/doctor.controller.js";
import { Router } from "express";

const router = Router();

// Define routes
router.post("/add", addDoctor);
router.get("/get", getDoctors);

export default router;
