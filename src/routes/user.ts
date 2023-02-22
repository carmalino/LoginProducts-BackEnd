import {Router} from 'express';
import { loginUser, newuser } from '../controllers/user';

const router = Router();
router.post('/',newuser);
router.post('/login',loginUser);


export default router;