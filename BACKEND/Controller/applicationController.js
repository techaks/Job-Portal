import { Application } from "../MODELS/applicationModel.js";
import { Job } from "../MODELS/jobModel.js";

export const applyJob = async (req, res) => {
  try {
    const userId = req.id;
    const jobId = req.params.id;

    if (!jobId) {
      return res.status(400).json({ message: "no job" });
    }

    const applied = await Application.findOne({
      applicant: userId,
      job: jobId,
    });
    if (applied) {
      return res.status(400).json({ message: "already applied" });
    }

    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(400).json({ message: "job not found" });
    }

    const application = await Application.create({
      applicant: userId,
      job: jobId,
    });

    await job.applications.push(application._id);
    await job.save();

    return res
      .status(200)
      .json({ message: "applied successfully", application });
  } catch (error) {
    console.log(error);
  }
};

export const getappliedJobs = async (req, res) => {
  try {
    const userId = req.id;
    const application = await Application.find({ applicant: userId })
      .populate({ path: "job", populate: { path: "company" } })
      .sort({ createdAt: -1 });

    if (!application.length) {
      return res.status(400).json({ message: "no application found" });
    }
    return res.status(200).json({success:true, message: "application found", application });
  } catch (error) {
    console.log(error);
  }
};

export const getApplicants = async (req, res) => {
  try {
    const jobId = req.params.id;
    const applicants = await Job.findById(jobId)
      .populate({ path: "applications", populate: { path: "applicant" } })
      .sort({ createdAt: -1 });
     
      
    if (!applicants.applications.length) {
      return res.status(400).json({ message: "no applicants found" });
    }

    return res.status(200).json({ message: "applicants found", applicants ,success:true});

  } catch (error) {
    console.log(error);
  }
};

export const updateApplicationStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const applicationId = req.params.id;

    if (!status) {
      return res.status(400).json({ message: "status not found" });
    }

    const application = await Application.findById(applicationId);
    if (!application) {
      return res.status(400).json({ message: "application not found" });
    }

    application.status = status.toLowerCase();
    await application.save();

    return res
      .status(200)
      .json({success:true, message: "status updated successfully", application });
  } catch (error) {
    console.log(error);
  }
};
