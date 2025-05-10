
import express  from 'express';
import { Login, Logout, Register, UpdateProfile } from '../Controller/userController.js';
import isAuth from '../Middleware/isAuth.js';
import { upload } from '../Middleware/multer.js';


const router = express.Router();

router.route("/login").post(Login); 
router.route("/register").post(upload,Register);
router.route("/logout").get(Logout);
router.route("/update-profile").post(isAuth,UpdateProfile);


export default router;

