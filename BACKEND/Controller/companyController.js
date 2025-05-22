import { Company } from "../MODELS/companyModel.js";
import cloudinary from "../utils/cloudinary.js";
import { getDataUri } from "../utils/dataUri.js";

export const RegisterCompany = async (req, res) => {
  try {
    const { name } = req.body;
    // console.log(name)
    if (!name) {
      return res.status(400).json({
        message: "Company name required ",
        success: false,
      });
    }

    let company = await Company.findOne({ name });
    if (company)
      return res.status(400).json({
        message: "you can not regester same company",
        success: false,
      });

    company = await Company.create({
      name,
      userId: req.id,
    });

    return res.status(200).json({
      message: "Company register successfully",
      success: true,
      company,
    });
  } catch (error) {
    console.log(error);
  }
};

export const GetCompany = async (req, res) => {
  try {
    const userId = req.id;
    // console.log(userId);

    let companies = await Company.find({ userId });

    if (!companies)
      return res.status(400).json({
        message: "no company found",
        success: false,
      });

    return res.status(200).json({
      companies,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

export const GetCompanyById = async (req, res) => {
  try {
    const companyId = req.params.id;

    const company = await Company.findById(companyId);

    if (!company)
      return res.status(400).json({
        message: "no Company found",
        success: false,
      });

    return res.status(200).json({
      success: true,
      company,
    });
  } catch (error) {
    console.log(error);
  }
};

export const UpdateCompany = async (req, res) => {
  try {
    const { name, description, location, website } = req.body;
    const file = req?.file;

  
  
    const updateData = { name, description, website, location };
    if(file){
      const url = getDataUri(file).content;

      const logo = (await cloudinary.uploader.upload(url)).secure_url
      updateData.logo = logo;
    }
    // console.log(updateData);
    const company = await Company.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
    });

    if (!company)
      return res.status(400).json({
        message: "error",
        success: false,
      });

    return res.status(200).json({
      message: "Company updated",
      company,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};
