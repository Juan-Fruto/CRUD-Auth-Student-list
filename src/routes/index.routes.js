import { Router} from 'express';
import {verifyController} from '../middlewares/tokens';
import { renderHome, renderAbout } from '../controllers/index.controller';
import 'cookie-parser';

const router =  Router();

//rutas de la interface home

router.get('/home', verifyController, renderHome);

//ruta de la interface about

router.get('/about', renderAbout);

export default router;