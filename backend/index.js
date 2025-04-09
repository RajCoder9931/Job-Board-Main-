import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./utils/db.js";
import userRoute from "./routes/user.route.js";
import companyRoute from "./routes/company.route.js";
import jobRoute from "./routes/job.route.js";
import applicationRoute from "./routes/application.route.js";
import path from "path";

dotenv.config({});

const app = express();


// middleware
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
const corsOptions = {
    origin:'https://jobboard-jfgj.onrender.com',
    credentials:true
}
const _dirname = path.resolve(); // add the path intilization

app.use(cors(corsOptions));

const PORT = process.env.PORT || 3000;

// api 
app.use("/api/v1/user", userRoute);
app.use("/api/v1/company", companyRoute);
app.use("/api/v1/job", jobRoute);
app.use("/api/v1/application", applicationRoute);
app.use(express.static(path.join(_dirname, "/frontend/dist"))); //path ke liye upload

app.get('*', (_,res) =>{
    res.sendFile(path.resolve(_dirname, "frontend", "dist" , "index.html")); //bulid karne ke liye
})

//cloudnary
console.log("Cloudinary API Key:", process.env.CLOUDINARY_API_KEY);
//check kar rha hu connection
app.listen(PORT,()=>{
    connectDB(); //database connect
    console.log(`Server running at port ${PORT}`);
})