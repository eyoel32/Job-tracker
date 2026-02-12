import './App.css';
import Header from './component/header';
import Jobform from './component/jobform';
import Joblist from './component/joblist';
import Filters from './component/filters';
import "./style/jobform.css";
import { useState, useEffect } from "react";
import Stats from './component/stats';
import "./style/joblist.css"


function App() {
  const [jobs, setJobs] = useState(() => {
    const saved = localStorage.getItem("jobs");
    return saved ? JSON.parse(saved) : [];
  });

  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [editingJob, setEditingJob] = useState(null);
  const [sortOption, setSortOption] = useState("newest");

  

  useEffect(() => {
    localStorage.setItem("jobs", JSON.stringify(jobs));
  }, [jobs]);

  const addJob = (job) => {
    setJobs((prev) => [...prev, job]);
  };

  const deleteJob = (id) => {
  const confirmDelete = window.confirm("Are you sure you want to delete this job?");
  
  if (confirmDelete) {
    setJobs(jobs.filter((job) => job.id !== id));
  }
};

  const filteredJobs = jobs.filter((job) =>filter === "All" ? true : job.status === filter)
    .filter((job) =>
      job.company.toLowerCase().includes(search.toLowerCase()) ||
      job.role.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => {
    if (sortOption === "newest") {
      return new Date(b.date) - new Date(a.date);
    }
    if (sortOption === "oldest") {
      return new Date(a.date) - new Date(b.date);
    }
    if (sortOption === "company") {
      return a.company.localeCompare(b.company);
    }
    return 0;
  });

   const updateJob = (updatedJob) => {setJobs((prevJobs) =>prevJobs.map((job) =>
      job.id === updatedJob.id ? updatedJob : job
    )
  );
  setEditingJob(null);
};


  return (
    <div className="container">
      <Header />

      <Jobform addJob={addJob} updateJob={updateJob} editingJob={editingJob}/>


      <Filters setFilter={setFilter} />

      <div className="top-controls">
           <input
             type="text"
             className="search-input"
             placeholder="Search by company or role..."
             value={search}
             onChange={(e) => setSearch(e.target.value)}
           />

  <select
    className="sort-select"
    value={sortOption}
    onChange={(e) => setSortOption(e.target.value)}
  >
    <option value="newest">Newest First</option>
    <option value="oldest">Oldest First</option>
    <option value="company">Company A–Z</option>
  </select>
</div>



      <Stats jobs={jobs} />

      <Joblist jobs={filteredJobs} deleteJob={deleteJob} setEditingJob={setEditingJob}/>

    </div>
  );
}

export default App;
