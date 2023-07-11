import { Router} from 'express';
import {
    renderAddGroup,
    addGroupHandler,
    studentList,
    addStudentHandler,
    deleteStudentHandler,
    editStudentRender,
    editStudentHandler,
} from '../controllers/group.controller';
import {verifyAuthToken} from '../middlewares/tokens';
import 'cookie-parser';

const router = Router();

//rutas de la interface de CRUD

router.get('/home/group/:id', verifyAuthToken, renderAddGroup);

router.post('/home/group/:id/add', verifyAuthToken, addGroupHandler);

router.get('/:groupName/students/CRUD', verifyAuthToken, studentList);

router.post('/:groupName/students/add', verifyAuthToken, addStudentHandler);

router.get('/:groupName/students/:id/delete', verifyAuthToken, deleteStudentHandler);

//rutas de la interface de edit

router.get('/:groupName/students/:id/edit', verifyAuthToken, editStudentRender);

router.post('/:groupName/students/:id/edit', verifyAuthToken, editStudentHandler);

export default router;