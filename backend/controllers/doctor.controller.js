import { Doctor } from "../models/doctor.model.js";

//add a new doctor
export const addDoctor = async (req, res) => {
  try {
    const {
      name,
      specialization,
      experience,
      qualifications,
      location,
      consultationFee,
      bookingFee = 0,
      workingAt,
      modeOfConsult,
      languages,
    } = req.body;

    // Validation
    if (
      !name ||
      !specialization ||
      !experience ||
      !qualifications ||
      !location ||
      !consultationFee ||
      !workingAt ||
      !modeOfConsult ||
      !languages
    ) {
      return res.status(400).json({
        success: false,
        message: "Please provide all required fields",
      });
    }

    // doctor instance
    const doctor = new Doctor({
      name,
      specialization,
      experience,
      qualifications,
      location,
      consultationFee,
      bookingFee,
      workingAt,
      modeOfConsult,
      languages,
    });

    // Save the doctor to db
    await doctor.save();

    res.status(201).json({
      success: true,
      message: "Doctor added successfully",
      doctor,
    });
  } catch (error) {
    console.log("Error while adding doctor: ", error.message);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

// fetch doctors with filters and pagination
export const getDoctors = async (req, res) => {
  try {
    const filter = {};

    // filter for modeOfConsult
    if (req.query.modeOfConsult) {
      const modeOfConsult = req.query.modeOfConsult
        .split(",")
        .map((el) => el === "1");

      (filter.$or = [
        { "modeOfConsult.hospitalVisit": modeOfConsult[0] },
        { "modeOfConsult.onlineConsult": modeOfConsult[1] },
      ]),
        console.log(filter);
    }

    // filter for experience
    if (req.query.experience) {
      let minExp;
      let maxExp = 0;

      if (req.query.experience.includes(" ")) maxExp = 100; // if query includes "+"(from client side rendered as " ") so 17+ is rendered as "1000 "
      let experience = req.query.experience
        .split(/[,\-]/)
        .map((el) => parseInt(el));
      console.log(experience, maxExp);
      minExp = Math.min(...experience);
      maxExp = Math.max(...experience, maxExp);
      filter.experience = { $gte: minExp, $lte: maxExp };
    }

    // filter for consultationFee
    if (req.query.consultationFee) {
      let minExp;
      let maxExp = 0;
      if (req.query.consultationFee.includes(" ")) maxExp = 100000; // if query includes "+"(from client side rendered as " ") so 1000+ is rendered as "1000 "
      let consultationFee = req.query.consultationFee
        .split(/[,\-]/)
        .map((el) => parseInt(el));
      console.log(consultationFee);
      minExp = Math.min(...consultationFee);
      maxExp = Math.max(...consultationFee, maxExp);
      filter.consultationFee = { $gte: minExp, $lte: maxExp };
    }

    // filter for languages
    if (req.query.languages) {
      const languages = req.query.languages.split(",");
      filter.languages = { $in: languages };
    }

    const doctorQuery = Doctor.find(filter);

    // Pagination
    const { page = 1, limit = 10 } = req.query; // default values for page and limit

    const currentPage = parseInt(page);
    const limitProvided = parseInt(limit);

    // Validate pagination parameters
    if (currentPage < 1 || limitProvided < 1) {
      return res.status(400).json({
        success: false,
        message: "currentPage and limit must be greater than 0",
      });
    }

    // Get total count of doctors after filter is applied
    const totalDoctors = await doctorQuery.clone().countDocuments();

    // Fetch doctors with pagination
    const doctors = await doctorQuery
      .limit(limitProvided)
      .skip((currentPage - 1) * limitProvided);

    const next =
      currentPage * limitProvided < totalDoctors ? currentPage + 1 : null;
    const prev = currentPage > 1 ? currentPage - 1 : null;

    // Send success response
    res.status(200).json({
      success: true,
      message: "Doctors fetched successfully",
      totalDoctors,
      doctorsOnPage: doctors.length,
      next,
      prev,
      doctors,
    });
  } catch (error) {
    console.log("Error while fetching doctors: ", error.message);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};
