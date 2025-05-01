// Import mongoose for database operations
import mongoose from "mongoose";

// Define the schema for a doctor
const doctorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  specialization: {
    type: String,
    required: true,
  },
  experience: {
    type: Number,
    required: true,
  },
  qualifications: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  consultationFee: {
    type: Number,
    required: true,
  },
  bookingFee: { type: Number, default: 0 },
  profileImage: {
    type: String,
    default: () =>
      `https://avatar.iran.liara.run/public/${
        Math.floor(Math.random() * 100) + 1
      }`,
  },
  workingAt: {
    type: String,
    required: true,
  },
  modeOfConsult: {
    hospitalVisit: {
      type: Boolean,
      required: true,
    },
    onlineConsult:{
      type: Boolean,
      required: true,
    },
  },
  languages: {
    type: [String],
    required: true,
  }
});

export const Doctor = mongoose.model("Doctor", doctorSchema);
