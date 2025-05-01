import { useState } from "react";

export default function FormModal({ isOpen, onClose }) {
  const apiURL = process.env.NEXT_PUBLIC_API_URL;
  const [formData, setFormData] = useState({
    name: "",
    specialization: "",
    experience: 0,
    qualifications: "",
    location: "",
    consultationFee: 0,
    bookingFee: 0,
    workingAt: "",
    modeOfConsult: {
      hospitalVisit: false,
      onlineConsult: false,
    },
    languages: [],
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name.includes("modeOfConsult.")) {
      const field = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        modeOfConsult: {
          ...prev.modeOfConsult,
          [field]: checked,
        },
      }));
    } else if (name === "languages") {
      setFormData((prev) => ({
        ...prev,
        languages: value.split(",").map((lang) => lang.trim()),
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: type === "number" ? Number(value) : value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${apiURL}/doctors/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Something went wrong");

      const data = await res.json();
      console.log("Submitted:", data);
      onClose(); // Close modal after success
    } catch (err) {
      console.error(err);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-full max-w-lg">
        <h2 className="text-xl font-semibold mb-4">Add Doctor</h2>
        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="text"
            name="name"
            placeholder="Doctor's Name (required)"
            required
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          />

          <input
            type="text"
            name="specialization"
            placeholder="Specialization (required)"
            required
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          />
          <input
            type="number"
            name="experience"
            placeholder="Experience in years (required)"
            required
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          />
          <input
            type="text"
            name="qualifications"
            placeholder="Qualifications (required)"
            required
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          />
          <input
            type="text"
            name="location"
            placeholder="Location (required)"
            required
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          />
          <input
            type="number"
            name="consultationFee"
            placeholder="Consultation Fee"
            required
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          />
          <input
            type="number"
            name="bookingFee"
            placeholder="Booking Fee (default 0)"
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          />
          <input
            type="text"
            name="workingAt"
            placeholder="Working At (required)"
            required
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          />

          <div>
            <label className="block mb-1">Mode of Consult</label>
            <label className="block">
              <input
                type="checkbox"
                name="modeOfConsult.hospitalVisit"
                onChange={handleChange}
              />{" "}
              Hospital Visit
            </label>
            <label className="block">
              <input
                type="checkbox"
                name="modeOfConsult.onlineConsult"
                onChange={handleChange}
              />{" "}
              Online Consult
            </label>
          </div>

          <input
            type="text"
            name="languages"
            placeholder="Languages (comma separated)"
            required
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          />

          <div className="flex justify-end gap-2 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-emerald-800 text-white rounded"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
