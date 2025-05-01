"use client";

import {
  CONSULTATION_FEES,
  EXPERIENCE,
  LANGUAGES,
} from "@/constants/constants.js";

export default function SidebarFilters({
  setFilters,
  filters,
  onFilterChange,
}) {
  return (
    <aside className="w-full hidden lg:block md:w-52 border-r border-gray-300 space-y-4">
      <div className="flex justify-between border-b border-gray-300">
        <h2 className="text-lg font-semibold px-3">Filters</h2>
        <button
          className="text-base font-semibold text-emerald-800 cursor-pointer px-3"
          onClick={() =>
            setFilters({
              modeOfConsult: "1,1",
              experience: "",
              consultationFee: "",
              languages: "",
            })
          }
        >
          Clear All
        </button>
      </div>

      <button className="text-emerald-900 border font-semibold border-emerald-900 py-2 px-4 w-auto mx-auto text-sm rounded-md">
        Show Doctors Near Me
      </button>

      <div>
        <h3 className="font-semibold text-sm mb-1">Mode of Consult</h3>
        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            name="Physical"
            // defaultChecked={filters.modeOfConsult.startsWith("1")}
            checked={filters.modeOfConsult.startsWith("1")}
            value={1}
            onChange={(e) => onFilterChange(e)}
          />{" "}
          Hospital Visit
        </label>
        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            name="Online"
            // defaultChecked={filters.modeOfConsult.endsWith("1")}
            checked={filters.modeOfConsult.endsWith("1")}
            value={1}
            onChange={(e) => onFilterChange(e)}
          />
          Online Consult
        </label>
      </div>

      <div>
        <h3 className="font-semibold text-sm mb-1">Experience (In Years)</h3>
        <div className="space-y-1 text-sm">
          {EXPERIENCE.map((experience, index) => (
            <label key={index} className="flex items-center gap-2">
              <input
                type="checkbox"
                value={experience}
                checked={filters.experience.includes(experience)}
                name="experience"
                onChange={(e) => onFilterChange(e)}
              />
              {experience === "17 " ? "17+" : experience}
            </label>
          ))}
          <p className="text-emerald-800 font-bold text-sm cursor-pointer">
            +1 More
          </p>
        </div>
      </div>

      <div>
        <h3 className="font-semibold text-sm mb-1">Fees (In Rupees)</h3>
        <div className="space-y-1 text-sm">
          {CONSULTATION_FEES.map((fee, index) => (
            <label key={index} className="flex items-center gap-2">
              <input
                type="checkbox"
                value={fee}
                checked={filters.consultationFee.includes(fee)}
                name="consultationFee"
                onChange={(e) => onFilterChange(e)}
              />
              {fee === "1000 " ? "1000+" : fee}
            </label>
          ))}
        </div>
      </div>
      <div>
        <h3 className="font-semibold text-sm mb-1">Languages</h3>
        <div className="space-y-1 text-sm">
          {LANGUAGES.map((language, index) => (
            <label key={index} className="flex items-center gap-2">
              <input
                type="checkbox"
                value={language}
                checked={filters.languages.includes(language)}
                name="languages"
                onChange={(e) => onFilterChange(e)}
              />
              {language}
            </label>
          ))}
          <p className="text-emerald-800 font-bold text-sm cursor-pointer">
            +10 More
          </p>
        </div>
      </div>
    </aside>
  );
}
