import { User } from "../MODELS/userModel.js";
import bcrypt from 'bcrypt';

import jwt from "jsonwebtoken";

export const Register = async (req,res) => {
  try {
    
    
    const {email, fullName, phoneNumber, password ,role } = req.body;

    if (!fullName || !email || !phoneNumber || !password || !role)
      return res.status(400).json({
        message: "Something missing",
        sucess: false,
      });


      const user =await User.findOne({email});
      
      
      if(user)
        return res.status(400).json({
            message:"Email allready registered",
            success:false,
        })
        

        const hashedPassword = await bcrypt.hash(password,10);
        
         await User.create({
            fullName,
            email,
            password:hashedPassword,
            phoneNumber,
            role,


         })




         return res.status(200).json({
            message:"regester successfully",
            success:true,
         })



  } catch (error) {
    console.log(error);
  }
};


export const Login = async (req,res)=>{
    try {

        const{email,password,role} = req.body;
        if ( !email || !password || !role)
            return res.status(400).json({
              message: "Something missing",
              sucess: false,
            });


            let user = await User.findOne({email});
            if(!user) return res.status(400).json({
                message: "Not Registered ",
                sucess: false,
              });

              const passwordMatch = await bcrypt.compare(password,user.password)
              if(!passwordMatch)return res.status(400).json({
                message: "password not matches ",
                sucess: false,
              });

              if(role !== user.role)return res.status(400).json({
                message: "Role Differ ",
                sucess: false,
              });


              const tokenData = {
               userId :user._id,
              }
              user = {
                _id:user._id,
                fullname:user.fullname,
                email:user.fullName,
                phoneNumber:user.phoneNumber,
                profile:user.profile
              }

              const token = await jwt.sign(tokenData,process.env.Secret_key)

              return res.status(200).cookie("token",token).json({
                success:true,
                user

              })


        
    } catch (error) {
        console.log(error);
        
        
    }
}

export const Logout = async (req,res)=>{

    try {
        return res.status(200).cookie("token","").json({
            message:"Logout Successfully",
            success:true,
        })
        
    } catch (error) {
        console.log(error);
        
        
    }
}

export const UpdateProfile = async(req,res)=>{
    try {
   
      
        const {fullName,phoneNumber,bio,skills} = req.body;
        
        
        const userId = req.id;
        console.log(userId);
        

        let user = await User.findById(userId);

        if(fullName) user.fullName = fullName;
        
        
        if(phoneNumber)user.phoneNumber = phoneNumber;
         
         if(bio) user.prifile.bio = bio;
         
         if(skills){
            let skillsArray = skills.split(',')
            user.profile.skills = skillsArray
         }
           

         await user.save();

         user = {
            _id : user._id,
            fullName: user.fullName,
            email:user.email,
            phoneNumber: user.phoneNumber,
            role:user.role,
            profile:user.profile,

         }


        return res.status(200).json({
            user,
            message:"account update successfully",
            success:true
        })

        
    } catch (error) {

        console.log(error);
        
        
    }




}


