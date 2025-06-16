import { authenticate } from '../middleware/auth';
import { getUser, login, signup, updateUser } from './../controllers/user.js';
import { authenticate } from '../middleware/auth';
import express from 'express';

const router = express.Router();

router.post('/update-user',authenticate,updateUser);
router.get('/users',authenticate,getUser);
router.post('/signup', signup);
router.post('/login',login);
router.post('/logout',login);



export default router;