import { Job } from "../MODELS/jobModel.js";



export const PostJob = async (req, res) => {
  try {
    const {
      title,
      description,
      requiremenets,
      salary,
      location,
      jobType,
      position,
      companyId,
    } = req.body;

    const userId = req.id;

    if (
      !title ||
      !description ||
      !requiremenets ||
      !salary ||
      !location ||
      !jobType ||
      !position ||
      !companyId ||
      !userId
    )
      return res.status(400).json({
        message: "Some Data Missing",
        success: false,
      });

    const job = await Job.create({
      title,
      description,
      requiremenets:requiremenets.split(","),
      salary,
      location,
      jobType,
      position,
      company:companyId,
      createdBy:userId,
    });


    return res.status(200).json({
        message: "Job created",
        success: true,
        job
      });

  } catch (error) {
    console.log(error);
  }
};


 export const GetAllJob = async (req,res)=>{
    try {
        const keyword = req.query.keyword || " ";
        const query = {
                $or:[
                    {title:{$regex:keyword,$options:"i"}},
                    {description:{$regex:keyword,$options:"i"}}
                ]
        }

        const jobs = await Job.find(query).populate({
            path: 'company',
            options: { sort: { createdAt: -1 } },
          });

        if(!jobs.length) return res.status(404).json({
            message:"No Jobs Found",
            success:false
        })

   
        
        return res.status(200).json({
            message:"Jobs Found",
            success:true,
            jobs
        })

        
    } catch (error) {
        console.log(error);
        
        
    }
 }

 export const JobById = async (req,res)=>{

    try {
        const id = req.params.id;
        const job = await Job.findById(id);
        if(!job) return res.status(404).json({
            message:"Job Not Found",
            success:false
        })
        return res.status(200).json({
            message:"Job Found",
            success:true,
            job
        })



    } catch (error) {
        console.log(error);
        
    }
 }

 export const AdminJob = async (req,res)=>{
    try {
        const id = req.id;
        const jobs = await Job.find({createdBy:id});

        if(!jobs) return res.status(404).json({
            message:"No Jobs Found",
            success:false
        })
        
        return res.status(200).json({
            message:"Jobs Found",
            success:true,
            jobs
        })


    } catch (error) {
        console.log(error);
        
    }
 }