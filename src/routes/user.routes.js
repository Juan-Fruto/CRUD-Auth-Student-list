import { Router} from 'express';
import {verifyAuthToken} from '../middlewares/tokens';
import { renderProfile } from '../controllers/user.controller'
import 'cookie-parser';

const router = Router();

router.get('/profile', verifyAuthToken, renderProfile);


export default router;