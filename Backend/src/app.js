import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

const app = express();
dotenv.config({
  path: "././.env",
});

app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true
}))

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended:true,limit:"16kb"}))



// import router
import router from "./Routes/userRoutes.js";

// set routers
app.use("/user",router)


export {app};