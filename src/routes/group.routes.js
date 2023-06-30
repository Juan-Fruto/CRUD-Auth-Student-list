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
import {verifyController} from '../middlewares/tokens';
import 'cookie-parser';

const router = Router();

//rutas de la interface de CRUD

router.get('/home/group/:id', verifyController, renderAddGroup);

router.post('/home/group/:id/add', verifyController, addGroupHandler);

router.get('/:groupName/students/CRUD', verifyController, studentList);

router.post('/:groupName/students/add', verifyController, addStudentHandler);

router.get('/:groupName/students/:id/delete', verifyController, deleteStudentHandler);

//rutas de la interface de edit

router.get('/:groupName/students/:id/edit', verifyController, editStudentRender);

router.post('/:groupName/students/:id/edit', verifyController, editStudentHandler);

export default router;