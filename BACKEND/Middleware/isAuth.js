
import jwt from 'jsonwebtoken';


const isAuth = async (req,res,next)=>{

    try {
        const token = req.cookies.token;
        
        
        if(!token){
            return res.status(400).json({
                message:"not authentic",
                success:false,
            })
        }


        const decode = await jwt.verify(token,process.env.Secret_key);

        if(!decode) 
        return res.status(400).json({
            message:"not authenticated"
        })
        // console.log(decode);
        


        req.id = decode.userId;
        next();

    } catch (error) {
        console.log(error);
        
    }


}

export default isAuth;










