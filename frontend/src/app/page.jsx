"use client";
import Head from "next/head";
import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar.jsx";
import SidebarFilters from "@/components/SidebarFilters.jsx";
import DoctorCard from "@/components/DoctorCard.jsx";
import FormModal from "@/components/FormModal";
import SortBar from "@/components/Sortbar.jsx";

export default function DoctorsListing() {
  const apiURL = process.env.NEXT_PUBLIC_API_URL;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [doctors, setDoctors] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [totalDoctors, setTotalDoctors] = useState(0);
  const [filters, setFilters] = useState({
    modeOfConsult: "1,1",
    experience: "",
    consultationFee: "",
    languages: "",
  });

  useEffect(() => {
    fetchDoctors();
  }, [filters, page]);

  const fetchDoctors = async () => {
    const query = new URLSearchParams({
      ...filters,
      page,
      limit,
    }).toString();

    const response = await fetch(`${apiURL}/doctors/get?${query}`);
    const data = await response.json();

    if (data.success) {
      setDoctors(data.doctors);
      setTotalDoctors(data.totalDoctors);
    }
  };

  const handleFilterChange = (e) => {
    const { name, value, checked } = e.target;
    if (name === "Physical" || name === "Online") {
      const prevValue = filters.modeOfConsult;
      console.log("prevValue: ", prevValue);

      let [physical, online] = prevValue.split(",");
      let newMode = "";
      if (name === "Physical") {
        newMode = checked ? `1,${online}` : `0,1`;
      } else {
        newMode = checked ? `${physical},1` : `1,0`;
      }
      setFilters((prev) => ({
        ...prev,
        modeOfConsult: newMode,
      }));
      return;
    }
    if (checked) {
      setFilters((prev) => ({
        ...prev,
        [name]: `${prev[name] ? prev[name] + "," : ""}${value}`,
      }));
    } else {
      const newValue = filters[name]
        .split(",")
        .filter((item) => item !== value)
        .join(",");
      setFilters((prev) => ({ ...prev, [name]: newValue }));
    }
    console.log("Filters: ", filters);
  };

  return (
    <>
      <Head>
        <title>Doctors Listing</title>
        <meta
          name="description"
          content="Find the best doctors with specialization, location, and consultation fee filters."
        />
        <meta property="og:title" content="Doctors Listing" />
        <meta
          property="og:description"
          content="Find the best doctors with specialization, location, and consultation fee filters."
        />
      </Head>

      <div className="sticky top-0 bg-white z-50">
        <Navbar />
      </div>

      <div className="flex flex-col md:flex-row gap-6 mx-auto max-w-[1320px] px-4 md:px-8 py-4">
        <div className="sticky top-28 h-fit">
          <SidebarFilters
            setFilters={setFilters}
            filters={filters}
            onFilterChange={handleFilterChange}
          />
        </div>

        <main className="w-full flex-1 md:w-3/4 flex flex-col gap-6">
          <p>
            <span className="text-emerald-700">Home</span> {">"}{" "}
            <span className="text-emerald-700">Doctors</span> {">"}{" "}
            <span className="text-emerald-700">General Physicians</span>
          </p>
          <SortBar totalDoctors={totalDoctors} />
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-emerald-800 font-bold text-white px-4 py-2 rounded"
          >
            Add Doctor
          </button>
          <FormModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
          />
          {doctors.map((doctor) => (
            <DoctorCard doctor={doctor} key={doctor._id} />
          ))}

          {/* Pagination */}

          <div className="flex justify-center gap-4 mt-6">
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded-md disabled:bg-gray-300"
              disabled={page === 1}
              onClick={() => setPage((prev) => prev - 1)}
            >
              Previous
            </button>
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded-md disabled:bg-gray-300"
              disabled={page * limit >= totalDoctors}
              onClick={() => setPage((prev) => prev + 1)}
            >
              Next
            </button>
          </div>
        </main>
      </div>
    </>
  );
}
