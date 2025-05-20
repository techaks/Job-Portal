import express from 'express'
import { GetCompany, GetCompanyById, RegisterCompany, UpdateCompany } from '../Controller/companyController.js';
import isAuth from '../Middleware/isAuth.js';
import { upload } from '../Middleware/multer.js';


const router = express.Router();

router.route('/register').post(isAuth,RegisterCompany);
router.route('/get').get(isAuth,GetCompany);
router.route('/get/:id').get(isAuth,GetCompanyById);
router.route('/update/:id').put(isAuth,upload,UpdateCompany);



export default router;;


