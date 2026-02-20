import { useState, useEffect } from "react";

function Jobform({ addJob, updateJob, editingJob }) {
  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");
  const [status, setStatus] = useState("Applied");
  const [date, setDate] = useState("");
  const [note, setNote] = useState("");

  useEffect(() => {
    if (editingJob) {
      setCompany(editingJob.company);
      setRole(editingJob.role);
      setStatus(editingJob.status);
      setDate(editingJob.date);
      setNote(editingJob.note);
    }
  }, [editingJob]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const jobData = {
      id: editingJob ? editingJob.id : Date.now(),
      company,
      role,
      status,
      date,
      note,
    };

    if (editingJob) {
      updateJob(jobData);
    } else {
      addJob(jobData);
    }
   /*These lines reset the form after submitting.*/
    setCompany("");
    setRole("");
    setStatus("Applied");
    setDate("");
    setNote("");
  };

  const buttonText = editingJob ? "Update Job" : "Add Job";
  return (
    <form className="job-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Company Name"
        value={company}
        onChange={(e) => setCompany(e.target.value)}
        required
      />

      <input
        type="text"
        placeholder="Job Role"
        value={role}
        onChange={(e) => setRole(e.target.value)}
        required
      />

      <select
        value={status}  
        onChange={(e) => setStatus(e.target.value)}
      >
        <option value="Applied">Applied</option>
        <option value="Interview">Interview</option>
        <option value="Rejected">Rejected</option>
        <option value="Offer">Offer</option>
      </select>

      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />

      <textarea
        placeholder="Note"
        value={note}
        onChange={(e) => setNote(e.target.value)}
      />

      <button type="submit">
        {buttonText}
      </button>
    </form>
  );
}

export default Jobform;
