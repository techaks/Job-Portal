import express from "express";
import { applyJob, getApplicants, getappliedJobs, updateApplicationStatus } from "../Controller/applicationController.js";
import isAuth from "../Middleware/isAuth.js";


const router = express.Router();

router.route('/applyjob/:id').post(isAuth,applyJob);
router.route('/appliedjobs').get(isAuth,getappliedJobs);
router.route('/getapplicants/:id').get(isAuth,getApplicants);
router.route('/updateStatus/:id').post(isAuth,updateApplicationStatus);



export default router;
