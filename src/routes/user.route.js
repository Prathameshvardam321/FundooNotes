import express from 'express';
import * as userController from '../controllers/user.controller';
import { newUserValidator } from '../validators/user.validator';
import { userAuth } from '../middlewares/auth.middleware';

const router = express.Router();

//route to get all users
router.get('', userController.getAllUsers);

//token
router.post('/token',userController.createToken)

//route to create a new user
router.post('/registeration', newUserValidator, userController.register);
 
//route to check login
router.post('/login',userController.login)






export default router;
