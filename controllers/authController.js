import { StatusCodes } from "http-status-codes";
import { attachCookiesToResponse } from "../utils/jwt.js";
import  createHash  from "../utils/createHash.js";
import sendResetPasswordEmail from "../utils/sendResetPasswordEmail.js";

import { sendVerificationEmail } from "../utils/sendVerficationEmail.js";
import createTokenUser from "../utils/createTokenUser.js";
import { v2 as cloudinary } from 'cloudinary';
import User from "../models/User.js";
import Token from "../models/Token.js";
import fs from 'fs';
import { BadRequestError } from "../errors/customErrors.js";
import { UnauthenticatedError } from "../errors/customErrors.js";
import crypto from 'crypto';


const register = async (req, res) => {
  const {  name,email, password,secondPassword,numberPhone,firstName,customer_id,country,city,levelOfStudy,specialty,occupation,image,image1 } = req.body;
  const emailAlreadyExists = await User.findOne({ email });
  if (emailAlreadyExists) {
    throw new BadRequestError("Email already exists");
  }
  // first registered user is an admin
  if(password!==secondPassword){
    throw new UnauthenticatedError("password is it not match");
  }
  const isFirstAccount = (await User.countDocuments({})) === 0;
  const role = isFirstAccount ? "admin" : "user";
  const verificationToken = crypto.randomBytes(40).toString('hex');
  const user = await User.create({name, email,customer_id,numberPhone,password,secondPassword, role,firstName,country,city,levelOfStudy,specialty,occupation,image,image1,verificationToken});
  // const tokenUser = createTokenUser(user);
  // attachCookiesToResponse({ res, user: tokenUser });
  const origin ='http://localhost:5173';
  await sendVerificationEmail({
    name: user.name,
    email: user.email,
    verificationToken: user.verificationToken,
    origin,
  });
  // send verification token back only while testing in postman!!!
  res.status(StatusCodes.CREATED).json({
    msg: 'Success! Please check your email to verify account',
  });
};
const checkEmail = async (req, res) => {
  const { email } = req.body;
  const emailAlreadyExists = await User.findOne({ email });
  if (emailAlreadyExists) {
      return res.status(200).json({ exists: true });
  }
  return res.status(200).json({ exists: false });
};
const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new BadRequestError('Please provide email and password');
  }
  const user = await User.findOne({ email });

  if (!user) {
    throw new UnauthenticatedError('Invalid Credentials');
  }
  const isPasswordCorrect = await user.comparePassword(password);

  if (!isPasswordCorrect) {
    throw new UnauthenticatedError('Invalid Credentials');
  }

  if (!user.isVerified) {
    throw new UnauthenticatedError('Please verify your email');
  }

  const tokenUser = createTokenUser(user);
  // create refresh token
  let refreshToken = '';
  // check for existing token
  const existingToken = await Token.findOne({ user: user._id });


  if (existingToken) {
    const { isValid } = existingToken;
    if (!isValid) {
      throw new UnauthenticatedError('Invalid Credentials');
    }
    refreshToken = existingToken.refreshToken;
    attachCookiesToResponse({ res, user: tokenUser, refreshToken });
    res.status(StatusCodes.OK).json({ user: tokenUser });
    return;
  }

  refreshToken = crypto.randomBytes(40).toString('hex');
  const userAgent = req.headers['user-agent'];
  const ip = req.ip;
  const userToken = { refreshToken, ip, userAgent, user: user._id };
  await Token.create(userToken);

  attachCookiesToResponse({ res, user: tokenUser, refreshToken });

  res.status(StatusCodes.OK).json({ user: tokenUser });
};

const verifyEmail = async (req, res) => {
  const { verificationToken, email } = req.body;
  console.log(verificationToken, email )
  const user = await User.findOne({ email });

  if (!user) {
    throw new UnauthenticatedError('Verification Failed');
  }

  if (user.verificationToken !== verificationToken) {
    throw new UnauthenticatedError('Verification Failed');
  }

  (user.isVerified = true), (user.verified = Date.now());
  user.verificationToken = '';

  await user.save();

  res.status(StatusCodes.OK).json({ msg: 'Email Verified' });
};
const logout = async (req, res) => {
  console.log(req.user)
  await Token.findOneAndDelete({ user: req.user.userId });

  res.cookie('accessToken', 'logout', {
    httpOnly: true,
    expires: new Date(Date.now()),
  });
  res.cookie('refreshToken', 'logout', {
    httpOnly: true,
    expires: new Date(Date.now()),
  });
  res.status(StatusCodes.OK).json({ msg: 'user logged out!' });
};

const forgotPassword = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    throw new BadRequestError('Please provide valid email');
  }

  const user = await User.findOne({ email });

  if (user) {
    const passwordToken = crypto.randomBytes(70).toString('hex');
    // send email
    const origin = 'http://localhost:5173';
    await sendResetPasswordEmail({
      name: user.name,
      email: user.email,
      token: passwordToken,
      origin,
    });

    const tenMinutes = 1000 * 60 * 10;
    const passwordTokenExpirationDate = new Date(Date.now() + tenMinutes);

    user.passwordToken = createHash(passwordToken);
    user.passwordTokenExpirationDate = passwordTokenExpirationDate;
    await user.save();
  }

  res
    .status(StatusCodes.OK)
    .json({ msg: 'Please check your email for reset password link' });
};
const resetPassword = async (req, res) => {
  const { token, email, password } = req.body;
  if (!token || !email || !password) {
    throw new BadRequestError('Please provide all values');
  }
  const user = await User.findOne({ email });

  if (user) {
    const currentDate = new Date();

    if (
      user.passwordToken === createHash(token) &&
      user.passwordTokenExpirationDate > currentDate
    ) {
      user.password = password;
      user.passwordToken = null;
      user.passwordTokenExpirationDate = null;
      await user.save();
    }
  }

  res.send('reset password');
};







const uploadImage = async (req, res) => {
  console.log(req.files.image)
  const result = await cloudinary.uploader.upload(
    req.files.image.tempFilePath,
    {
      use_filename: true,
      folder: 'fileUpload',
    }
  );
  fs.unlinkSync(req.files.image.tempFilePath);
  return res.status(StatusCodes.OK).json({ image:result.secure_url  });

};
const uploadImage1 = async (req, res) => {
    console.log(req.files.image1)
    const result = await cloudinary.uploader.upload(
      req.files.image1.tempFilePath,
      {
        use_filename: true,
        folder: 'fileUpload',
      }
    );
    fs.unlinkSync(req.files.image1.tempFilePath);
    return res.status(StatusCodes.OK).json({ image1:result.secure_url  });

};

export { register, login, logout,uploadImage,uploadImage1,checkEmail,verifyEmail,resetPassword ,forgotPassword};
