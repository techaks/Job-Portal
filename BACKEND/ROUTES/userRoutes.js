
import express  from 'express';
import { Login, Logout, Register, UpdateProfile } from '../Controller/userController.js';
import isAuth from '../Middleware/isAuth.js';


const router = express.Router();

router.route("/login").post(Login); 
router.route("/register").post(Register);
router.route("/logout").get(Logout);
router.route("/update-profile").post(isAuth,UpdateProfile);


export default router;

