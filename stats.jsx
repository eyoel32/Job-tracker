import React from 'react'


function Stats({ jobs }) {
  const total = jobs.length;
  const applied = jobs.filter((job) => job.status === "Applied").length;
  const interview = jobs.filter((job) => job.status === "Interview").length;
  const rejected = jobs.filter((job) => job.status === "Rejected").length;
  const offer = jobs.filter((job) => job.status === "Offer").length;

  return (
    <div className="stats">
      <p>Total: {total}</p>
      <p>Applied: {applied}</p>
      <p>Interview: {interview}</p>
      <p>Rejected: {rejected}</p>
      <p>Offer: {offer}</p>
    </div>
  );
}

export default Stats;
