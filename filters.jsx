import React from "react";

function Filters({ filter, setFilter }) {
  const statuses = ["All", "Applied", "Interview", "Rejected", "Offer"];

  return (
    <div className="filters">
      {statuses.map((status) => {
        const isActive = filter === status;
      
        return (
          <button
            key={status}
            className={isActive ? "active" : ""}
            onClick={() => setFilter(status)}
          >
            {status}
          </button>
        );
      })}
    </div>
  );
}

export default Filters;
