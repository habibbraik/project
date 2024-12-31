import express from 'express';
import fileUpload from 'express-fileupload';
import { authenticateUser, authorizePermissions } from '../middleware/authentication.js';
import { uploadImage, uploadVideo,createPhotoWithVideo,getPhotoWithVideo,deletePhotoWithVideo} from '../controllers/videoController.js';
import upload from '../middleware/multerMiddleware.js';
const router = express.Router();
const fileUploadMiddleware = fileUpload({ useTempFiles: true });

router.route('/uploadVideo').post(upload.single('video'),[authenticateUser, authorizePermissions('admin')],uploadVideo).get(getPhotoWithVideo)
router.route('/uploadImage').post(fileUploadMiddleware,[authenticateUser, authorizePermissions('admin')],uploadImage)
router.route('/createPhotoWithVideo').post([authenticateUser, authorizePermissions('admin')],createPhotoWithVideo)
router.route('/:id').delete([authenticateUser, authorizePermissions('admin')], deletePhotoWithVideo)

export default router;
