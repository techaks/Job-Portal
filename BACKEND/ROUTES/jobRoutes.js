import express from 'express';
import { AdminJob, GetAllJob, JobById, PostJob } from '../Controller/jobController.js';
import isAuth from '../Middleware/isAuth.js';


const router = express.Router();

router.route('/post').post(isAuth,PostJob);
router.route('/alljobs').get(isAuth,GetAllJob);
router.route('/adminjob').get(isAuth,AdminJob);
router.route('/jobbyid/:id').get(isAuth,JobById);


export default router;

