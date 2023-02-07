import express from 'express';
import * as userController from '../controllers/user.controller';
import { newUserValidator } from '../validators/user.validator';
import { userAuth,resetPasswordAuth } from '../middlewares/auth.middleware';

const router = express.Router();
 
router.get('/',userController.getAllUsers)
//route to create a new user
router.post('/', newUserValidator, userController.register);
 
//route to check login
router.post('/login',userController.login)

//forget password
router.post('/forgetpassword',userController.forgetPassword)

//reset password
router.put('/resetpassword/:tokenId',resetPasswordAuth,userController.resetPassword)

export default router;
