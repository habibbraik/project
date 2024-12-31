import express from'express'
const router=express.Router()
import fileUpload from 'express-fileupload';
import { authenticateUser } from '../middleware/authentication.js';
import {register,login,logout,uploadImage,uploadImage1,verifyEmail,checkEmail,resetPassword,forgotPassword  } from '../controllers/authController.js'
const fileUploadMiddleware = fileUpload({ useTempFiles: true });
router.post('/register',register)
router.post('/check-email',checkEmail)
router.post('/verify-email', verifyEmail);
router.route('/uploadImage').post(fileUploadMiddleware,uploadImage)
router.route('/uploadImage1').post(fileUploadMiddleware,uploadImage1)
router.post('/login',login)
router.get('/logout',authenticateUser,logout)
router.post('/reset-password', resetPassword);
router.post('/forgot-password', forgotPassword);

export default router;