"use client";
import { FaThumbsUp } from "react-icons/fa";
import { IoMdInformationCircleOutline } from "react-icons/io";

export default function DoctorCard({ doctor }) {
  return (
    <div className="border border-gray-300 rounded-lg p-4 flex gap-4 items-start w-full flex-wrap shadow-sm hover:shadow-md transition">
      <img
        src={doctor.profileImage}
        alt={doctor.name}
        loading="lazy"
        className="w-16 object-cover border border-gray-300"
      />
      <div className="flex-1 ">
        <div className="flex flex-1 flex-col items-start">
          <div className="font-semibold text-lg flex items-center gap-1">
            {doctor.name}
            <IoMdInformationCircleOutline className="text-gray-400" />
          </div>

          <span className="text-base text-gray-400 font-semibold">
            {doctor.specialization}
          </span>
        </div>
        <p className="text-sm text-gray-500">{doctor.specialty}</p>
        <p className="text-sm font-semibold text-purple-800 mt-1">
          {doctor.experience} YEARS • {doctor.qualifications}
        </p>
        <p className="text-sm text-gray-500 mt-1">
          {doctor.workingAt} - {doctor.location}
        </p>
      </div>
      <div className="mt-3 flex-1 self-end flex flex-col items-center gap-2">
        <p className="font-bold text-lg">₹{doctor.consultationFee}</p>

        <button className="border flex-1 rounded-md px-24 py-3 text-sm hover:bg-gray-100 text-emerald-800 font-semibold border-emerald-800 text-nowrap">
          Consult Online
        </button>
      </div>
    </div>
  );
}
