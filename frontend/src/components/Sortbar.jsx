"use client";
import { FaSortAmountDownAlt } from "react-icons/fa";

export default function SortBar({totalDoctors}) {
  return (
    <div className="flex items-center justify-between mb-4">
      <h1 className="text-2xl font-bold">
        Consult General Physicians Online - Internal Medicine Specialists
        <br/>
      <span className="text-base font-normal">({totalDoctors} doctors)</span>
      </h1>
      <button className="border px-16 py-4 text-sm flex items-center gap-2 rounded-md hover:bg-gray-50">
        <FaSortAmountDownAlt /> Availability
      </button>
    </div>
  );
}
