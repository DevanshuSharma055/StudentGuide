import userModel from "../Models/userModel.js";
import { createAccessAndRefreshToken } from "../Utils/generateTokens.js";
import { sendError, sendSuccess } from "../Utils/response.js";
import { OAuth2Client } from "google-auth-library";

const SignIn = async (req, res, next) => {
  // get data
  const { email, Name: name, password } = req.body;
  // validation on data
  if (!email || !name || !password) {
    return sendError(res, "enter all value", 401);
  }
  try {
    // check user email is present or not
    const checkEmail = await userModel.findOne({ email });
    if (checkEmail) {
      return sendError(res, "Email is present", 401);
    }
    // create user
    const createUser = await userModel.create({
      email,
      name,
      password,
    });

    //send response
    return sendSuccess(res, "user create successful");
  } catch (error) {
    // handle error
    return sendError(res);
  }
};

const Login = async (req, res, next) => {
  //get email and password
  const { email, password } = req.body;
  if (!email || !password) {
    return sendError(res, "Enter all value", 401);
  }
  try {
    // check mail in db
    const findUserByMail = await userModel.findOne(
      { email },
      { _id: 1, email: 1, password: 1, name: 1 }
    );
    if (!findUserByMail) {
      return sendError(res, "Email not found", 401);
    }
    // if mail present match password
    const checkPassword = await findUserByMail.isPasswordCorrect(password);
    if (!checkPassword) {
      return sendError(res, "Password is Incorrect", 401);
    }
    // password match send access token and user details
    //Genrate tokens
    const { AccessToken, RefreshToken } = await createAccessAndRefreshToken(
      findUserByMail._id
    );

    const userData = {
      email: findUserByMail.email,
      name: findUserByMail.name,
    };

    // send data and token

    //set option
    const option = {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      path: "/",
    };
    return res
      .status(200)
      .cookie("AccessToken", AccessToken, option)
      .cookie("RefreshToken", RefreshToken, option)
      .json({
        message: "User logged in successfully",
        userData,
        AccessToken,
        RefreshToken,
      });
  } catch (error) {
    return sendError(res);
  }
};

const ForgetPassword = async (req, res, next) => {
  try {
    const { email, newPassword } = req.body;

    if (!email || !newPassword) {
      return sendError(res, "Email and new password are required", 400);
    }

    const user = await userModel.findOne({ email });

    if (!user) {
      return sendError(res, "User not found", 404);
    }

    user.password = newPassword;

    await user.save();

    return sendSuccess(res, "Password reset successful");
  } catch (error) {
    console.error("ForgetPassword Error:", error);
    return sendError(res, "Internal Server Error", 500);
  }
};

const verifyMail = async (req, res, next) => {
  try {
    const { email } = req.body;

    if (!email) {
      return sendError(res, "Email is required", 400);
    }

    const user = await userModel.findOne({ email });

    if (!user) {
      return sendError(res, "User not found", 404);
    }

    user.isAccountActive = true;

    await user.save();

    return sendSuccess(res, "Email verified successfully");
  } catch (error) {
    console.error("verifyMail Error:", error);
    return sendError(res, "Internal Server Error", 500);
  }
};

const GoogleLogin = async (req, res, next) => {
  const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
  const { token } = req.body;

  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });


    const payload = ticket.getPayload();
    const { email, name } = payload;
    let AccessToken, RefreshToken;
    let user;


    if (!email) {
      return sendError(res, 401, "Google login failed. Email not found.");
    }

    // Step 1: Check if user already exists
    user = await userModel.findOne({ email });

    // Step 2: If user does not exist, create a new one
    if (!user) {
      user = await userModel.create({
        email,
        name,
        password: '', 
        isGoogleAuth: true,
      });
    }
    // Step 3: Generate tokens
    const tokens = await createAccessAndRefreshToken(user._id);
    AccessToken = tokens.AccessToken;
    RefreshToken = tokens.RefreshToken;
    
    const userData = {
      email: user.email,
      name: user.name,
    };
    const cookieOptions = {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      path: "/",
    };

    return res
      .status(200)
      .cookie("AccessToken", AccessToken, cookieOptions)
      .cookie("RefreshToken", RefreshToken, cookieOptions)
      .json({
        message: "Google login successful",
        userData,
        AccessToken,
        RefreshToken,
      });
  } catch (error) {
    console.error("Google login error:", error);
    return sendError(res, 500, "Internal server error during Google login");
  }
};
const Logout = (req, res) => {
  res.clearCookie("AccessToken", {
    httpOnly: true,
    secure: true,
    path: "/",
  });
  sendSuccess(res, "Logged out successfully");
};

export { SignIn, Login, ForgetPassword, verifyMail, Logout, GoogleLogin };
