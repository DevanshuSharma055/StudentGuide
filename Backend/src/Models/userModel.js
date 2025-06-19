import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from 'bcryptjs'

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
    unique: true,
  },
  password: {
    type: String,
    require: true,
  },
  verifyOtp: {
    type: String,
    default: "",
  },
  verifyOtpExpireAt: {
    type: String,
    default: 0,
  },
  resetOtp: {
    type: String,
    default: "",
  },
  resetOtpExpireAt: {
    type: String,
    default: 0,
  },
  isGoogleAuth:{
    type: Boolean,
    default:false
  },
  isAccountActive: {
    type: Boolean,
    default: false,
  },
  refreshToken: {
    type: String,
  },
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
};

userSchema.methods.genrateAccessToken = async function () {
  return jwt.sign(
    {
      _id: this.id,
      email: this.email,
      name: this.name,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
    }
  );
};

userSchema.methods.generateRefreshToken = async function () {
  return jwt.sign(
    {
      _id: this._id,
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
    }
  );
};

const userModel = mongoose.model.user || mongoose.model("userData", userSchema);

export default userModel;
