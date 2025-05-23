import { User } from "../MODELS/userModel.js";
import bcrypt from "bcrypt";

import jwt from "jsonwebtoken";

import cloudinary from "../utils/cloudinary.js";
import { getDataUri } from "./../utils/dataUri.js";

export const Register = async (req, res) => {
  try {
    const { fullName, email, phoneNumber, password, role, passcode } = req.body;
    //  console.log(email,fullName, phoneNumber, password ,role,passcode);

    if (
      role === "recruiter" &&
      passcode !== "85390" &&
      passcode !== "bahubali"
    ) {
      return res.status(400).json({
        message: "passcode different",
        sucess: false,
      });
    }

    let avtar;
    if (req.file) {
      avtar = getDataUri(req.file);
    }
    if (!fullName || !email || !phoneNumber || !password || !role)
      return res.status(400).json({
        message: "Something missing",
        sucess: false,
      });

    const user = await User.findOne({ email });

    if (user)
      return res.status(400).json({
        message: "Email allready registered",
        success: false,
      });

    const hashedPassword = await bcrypt.hash(password, 10);
    let url;
    if (avtar) {
      const file = avtar;
      const cloudresponse = await cloudinary.uploader.upload(file.content);
      // console.log(cloudresponse.secure_url);

      url = cloudresponse.secure_url;
    }

    await User.create({
      fullName,
      email,
      password: hashedPassword,
      phoneNumber,
      role,
      profile: {
        profilePhoto: url,
      },
    });

    return res.status(200).json({
      message: "register successfully",
      success: true,
      user,
    });
  } catch (error) {
    console.log(error);
  }
};

export const Login = async (req, res) => {
  try {
    const { email, password, role } = req.body;
    if (!email || !password || !role)
      return res.status(400).json({
        message: "Something missing",
        sucess: false,
      });

    let user = await User.findOne({ email });
    if (!user)
      return res.status(400).json({
        message: "Not Registered ",
        sucess: false,
      });

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch)
      return res.status(400).json({
        message: "password not matches ",
        sucess: false,
      });

    if (role !== user.role)
      return res.status(400).json({
        message: "Role Differ ",
        sucess: false,
      });

    const tokenData = {
      userId: user._id,
    };

    const token = await jwt.sign(tokenData, process.env.Secret_key);

    

    user = {
      _id: user._id,
      fullName: user.fullName,
      role: user.role,
      email: user.email,
      phoneNumber: user.phoneNumber,
      profile: user.profile,
    };
   

    

    return res
      .status(200).json({
        success: true,
        user,
        token
      });
  } catch (error) {
    console.log(error);
  }
};


export const Logout = async (req, res) => {
  try {
    return res.status(200).cookie("token", "").json({
      message: "Logout Successfully",
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

export const UpdateProfile = async (req, res) => {
  try {
    const { fullName, phoneNumber, bio, skills } = req.body;
    let resume;
    if (req.file) {
      resume = getDataUri(req.file);
    }

    const userId = req.id;
    // console.log(userId);

    let user = await User.findById(userId);

    if (fullName) user.fullName = fullName;

    if (phoneNumber) user.phoneNumber = phoneNumber;

    if (bio) user.profile.bio = bio;

    if (skills) {
      let skillsArray = skills.split(",");
      user.profile.skills = skillsArray;
    }
    if (resume) {
      const file = resume;
      const cloudresponse = await cloudinary.uploader.upload(file.content);
      // console.log(cloudresponse.secure_url);
      if (cloudresponse) {
        user.profile.resume = cloudresponse.secure_url;
      }
    }

    await user.save();

    user = {
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      phoneNumber: user.phoneNumber,
      role: user.role,
      profile: user.profile,
      resume: user.profile.resume,
    };

    return res.status(200).json({
      user,
      message: "account update successfully",
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};
