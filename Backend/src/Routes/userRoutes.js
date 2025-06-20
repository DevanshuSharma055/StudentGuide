import { Router } from "express";
import { checkAuth, userAuth } from "../Middlewares/userAuth.js";
import { ForgetPassword, GoogleLogin, Login, Logout, SignIn, verifyMail } from "../Controllers/userControllers.js";
import { gernateAndSendOtp, verifyOtp } from "../Controllers/otpControllers.js";
import { callGeminiAPi } from "../Controllers/studentGuideControllers.js";

const router = Router();


router.post('/LogIn',Login);
router.post('/SignIn', SignIn);
router.get('/me', checkAuth)
router.post('/SendOtp', gernateAndSendOtp);
router.post('/VerfiyOtp', verifyOtp);
router.post('/verfiyMail', userAuth, verifyMail);
router.post('/ForgetPassword',ForgetPassword);
router.post('/Logout', userAuth, Logout)
router.post('/GoogleLogin', GoogleLogin)
router.post('/GetReport', userAuth,callGeminiAPi)



export default router;
