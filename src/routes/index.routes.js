import { Router} from 'express';
import {verifyAuthToken} from '../middlewares/tokens';
import { renderHome, renderAbout } from '../controllers/index.controller';
import 'cookie-parser';

const router =  Router();

//rutas de la interface home

router.get('/home', verifyAuthToken, renderHome);

//ruta de la interface about

router.get('/about', renderAbout);

export default router;