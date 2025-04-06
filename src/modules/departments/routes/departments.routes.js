import express from 'express';
import DepartmentsController from '../controllers/departments.controller.js';
import ensureAuthenticated from '../../../shared/middlewares/ensure-authenticated.middleware.js'
import ensureAuthorized from '../../../shared/middlewares/ensure-authorized.middleware.js'
import UserType from '../../user/enums/EUsers.js';

const departmentRoutes = express.Router();

    departmentRoutes.post(
        '/',
        ensureAuthenticated,
        ensureAuthorized([UserType.ADMIN]),
        DepartmentsController.create
    );

    departmentRoutes.delete('/delete/:id',
     ensureAuthenticated,
    ensureAuthorized([UserType.ADMIN]), 
    DepartmentsController.delete);

    departmentRoutes.put('/update/:id', 
    ensureAuthenticated,
    ensureAuthorized([UserType.ADMIN]), 
    DepartmentsController.update);

    departmentRoutes.get('/show/:id', 
    ensureAuthenticated,
    ensureAuthorized([UserType.ADMIN]), 
    DepartmentsController.show);

    departmentRoutes.get('/list', 
    ensureAuthenticated,
    ensureAuthorized([UserType.ADMIN]), 
    DepartmentsController.list);



export default departmentRoutes;