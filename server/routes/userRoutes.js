import express from "express";
import {register, login, usesrCredits, razorpayGateway, verifyRazorpay, sendResetOtp, resetPassword, verifyResetOtp} from "../controllers/userController.js"
import authenticateToken from "../middleware/auth.js";

const userRouter = express.Router()

//Routes
// authenticateToken will convert the token as user_id
 userRouter.post("/register", register);
 userRouter.post("/login", login);
 userRouter.get("/credits", authenticateToken, usesrCredits);
 userRouter.post("/razorpay", authenticateToken, razorpayGateway);
 userRouter.post("/verifyrazorpay", verifyRazorpay);
 userRouter.post("/send-reset-otp", sendResetOtp);
 userRouter.post("/reset-reset-otp", resetPassword);
 userRouter.post("/verify-reset-otp", verifyResetOtp);
 


export default userRouter;