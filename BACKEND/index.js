import cookieParser from "cookie-parser";
import express from "express"
import DbConnect from "./utils/DB.js";
import 'dotenv/config'
import userRouter from "./ROUTES/userRoutes.js";
import companyRouter from "./ROUTES/companyRoute.js";
import jobRouter from "./ROUTES/jobRoutes.js";
import applicationRouter from "./ROUTES/applicationRoutes.js";
import cors from "cors";


const app = express(); 
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true,
}))

// app.use(cors({
//     origin:"http://192.168.135.7:5173",
//     credentials:true,
// }))
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());

app.use('/api/v1/user',userRouter);
app.use('/api/v1/company',companyRouter);
app.use('/api/v1/job',jobRouter);
app.use('/api/v1/application',applicationRouter);



const PORT = process.env.PORT || 3000;

app.listen(PORT,()=>{
    DbConnect();
    console.log(`server started at server ${PORT}`);
    
})

app.get('/home',(req,res)=>{
    return res.status(200).json("home");
    
})