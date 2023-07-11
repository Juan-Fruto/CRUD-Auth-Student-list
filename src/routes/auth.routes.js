import { Router} from 'express';
import { verifyResetToken } from '../middlewares/tokens';
import {
    renderLogin,
    loginHandler,
    renderRegister,
    registerHandler,
    recoverPasswordRender,
    recoverPasswordHandler,
    verifyRecoverPasswordRender,
    verifyRecoverPasswordHandler,
    resetPasswordRender,
    resetPasswordHandler
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

router.get('/recover', recoverPasswordRender);

router.post('/recover', recoverPasswordHandler);

router.get('/recover/verify/:id', verifyRecoverPasswordRender);

router.post('/recover/verify/:id', verifyRecoverPasswordHandler);

router.get('/recover/reset-password/:id/:jwtToken', verifyResetToken, resetPasswordRender);

router.post('/recover/reset-password/:id/:jwtToken', verifyResetToken, resetPasswordHandler);

router.get('/logout', logoutController);

export default router;