import userModel from "../Models/userModel.js";
import jwt from "jsonwebtoken";

const userAuth = async (req, res, next) => {
  try {
    // get token from cookies or body
    const token = req.cookies.AccessToken;

    // check token is comeing or not
    if (!token) {
      return res.status(401).send({ message: "please provide token" });
    }

    // verify token with access token
    let UserTokenDetails;
    try {
      UserTokenDetails = await jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET
      );
    } catch (err) {
      if (err.name === "TokenExpiredError") {
        return res
          .status(401)
          .send({ message: "Token has expired, please log in again" });
      }
      return res.status(401).send({ message: "Invalid token" });
    }
    // get id from verify token
    const userId = UserTokenDetails._id;

    // find user
    const user = await userModel.findById(userId);

    // validate or check  user presenet
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }
    // send user id to next step
    req.UserId = user._id;
    req.email = user.email;
    next();
  } catch (error) {
    console.log("error at userAuth", error);
  }
};

const checkAuth = async (req, res, next) => {
  const token = req.cookies.AccessToken;
  if (!token) return res.json({ success: false });

  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    return res.json({ success: true, user: decoded });
  } catch (err) {
    return res.json({ success: false });
  }
};

export { userAuth, checkAuth };
