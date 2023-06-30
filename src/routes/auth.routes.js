import { Router} from 'express';
import {
    renderLogin,
    loginHandler,
    renderRegister,
    registerHandler,
    recoverAccount
} from '../controllers/auth.controller';
import {logoutController} from '../middlewares/tokens';
import 'cookie-parser';

const router = Router()

//rutas de la interface de login

router.get('/', renderLogin);

router.post('/login', loginHandler);

//rutas de la interface de registro

router.get('/register', renderRegister);

router.post('/register', registerHandler);

router.get('/recover', recoverAccount);

router.get('/logout', logoutController);

export default router;