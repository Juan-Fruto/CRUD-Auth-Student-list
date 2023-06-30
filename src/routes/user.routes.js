import { Router} from 'express';
import {verifyController} from '../middlewares/tokens';
import { renderProfile } from '../controllers/user.controller'
import 'cookie-parser';

const router = Router();

router.get('/profile', verifyController, renderProfile);


export default router;