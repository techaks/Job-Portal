import React from "react";

const jobs = [
  {
    date: "2023-10-01",
    role: "Software Engineer",
    company: "Google",
    status: "rejected",
  },
  {
    date: "2023-10-02",
    role: "Data Scientist",
    company: "Meta",
    status: "accepted",
  },
  {
    date: "2023-10-03",
    role: "Product Manager",
    company: "Amazon",
    status: "pending",
  },
];
const AppliedJobs = () => {
  return (
    <div>
      <div className="grid grid-cols-4 gap-4 font-semibold mt-4 bg-gray-100 p-2 rounded text-[#ff8c00]">
        <p>Date</p>
        <p>Role</p>
        <p>Company</p>
        <p className=" mx-auto">Status</p>
      </div>

      
        {jobs.map((job, index) => (
          <div className="grid grid-cols-4 gap-4 p-2 mt-2 font-medium">
            <p>{job.date}</p>
            <p>{job.role}</p>
            <p>{job.company}</p>

            <p  className={`px-2 py-1 rounded text-white text-center ${
                job.status === "pending"
                  ? "bg-yellow-500"
                  : job.status === "accepted"
                  ? "bg-green-600"
                  : "bg-red-500"} `}>{job.status}</p>

          </div>
        ))}
     
    </div>
  );
};

export default AppliedJobs;
