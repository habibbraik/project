import express from 'express';
const router = express.Router();

import {
    getAllUsers,
    // getSingleUser,
    showCurrentUser,
    getCurrentUserOrders,
    // upgradeUser,
    // updateUserPassword,
    // getApplicationStats,
    // deleteUser,
    // updateUser,
    // updateUserFromAdmin,
    deleteUserFromAdmin,
} from '../controllers/userController.js';
// import { validateUpdateUser } from '../middleware/validationMiddleware.js'
import { authenticateUser, authorizePermissions } from '../middleware/authentication.js';
// import upload from '../middleware/multerMiddleware.js';
router.route('/').get(authenticateUser, authorizePermissions('admin'), getAllUsers);
router.route('/showMe').get(authenticateUser, showCurrentUser);
router.route('/showCurrentOrders').get(authenticateUser,getCurrentUserOrders);
// router.get('/admin/app-stats',getApplicationStats);
// router.delete('/deleteUser', authenticateUser, deleteUser);
// router.post('/upgradeUser',authenticateUser,upgradeUser)
// router.patch('/updateUser',upload.single('avatar'),authenticateUser,updateUser);
// router.patch('/update-user',checkForTestUser,upload.single('avatar'),validateUpdateUser,authenticateUser,updateUser);

// router.route('/:id').patch(authenticateUser, authorizePermissions('admin'),updateUserFromAdmin)
router.route('/:id').delete(authenticateUser, authorizePermissions('admin'),deleteUserFromAdmin)
// router.route('/updateUserPassword').patch(authenticateUser, updateUserPassword);
// router.route('/:id').get(authenticateUser, getSingleUser);

export default router;
