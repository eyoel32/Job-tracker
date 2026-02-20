import React from "react";

function Joblist({ jobs = [], deleteJob,setEditingJob}) {
  if (jobs.length === 0) {
    return(
       <div className="empty-state">
        <h3>No jobs yet 🚀</h3>
       <p>Start by adding your first job application.</p>
</div>
     ) ;
  }

  return (
    <div>
      {jobs.map((job) => (
        <div className="job-card" key={job.id}>
          <h3>{job.company}</h3>

          <p><strong>Role:</strong> {job.role}</p>
          <p> <strong>Status:</strong>{" "}
           <span className={`status-badge ${job.status.toLowerCase()}`}> {job.status} </span>
            </p>

          <p><strong>Date:</strong> {job.date}</p>

          {job.note && (
            <p><strong>Note:</strong> {job.note}</p>
          )}

          <button onClick={() => deleteJob(job.id)}>Delete</button>
          <button onClick={() => setEditingJob(job)}>Edit</button>

        </div>
      ))}
    </div>
  );
}

export default Joblist;
