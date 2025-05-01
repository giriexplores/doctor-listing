import React from 'react';

const Filters = ({ filters, onFilterChange }) => {
  return (
    <div className="flex flex-col gap-4 p-4 border rounded-md max-w-sm">
      <h2 className="text-lg font-semibold">Filters</h2>
      <div>
        <label className="block text-sm font-medium mb-1">Specialization</label>
        <input
          type="text"
          name="specialization"
          value={filters.specialization}
          onChange={onFilterChange}
          className="w-full p-2 border rounded-md"
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Location</label>
        <input
          type="text"
          name="location"
          value={filters.location}
          onChange={onFilterChange}
          className="w-full p-2 border rounded-md"
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Consultation Fee</label>
        <input
          type="number"
          name="consultationFee"
          value={filters.consultationFee}
          onChange={onFilterChange}
          className="w-full p-2 border rounded-md"
        />
      </div>
    </div>
  );
};

export default Filters;