import express from 'express';
import DepartmentsController from '../controllers/departments.controller.js';
import ensureAuthenticated from '../../../shared/middlewares/ensure-authenticated.middleware.js'
import ensureAuthorized from '../../../shared/middlewares/ensure-authorized.middleware.js'
import UserType from '../../user/enums/EUsers.js';

const departmentRoutes = express.Router();
departmentRoutes.post(
    '/', 
     /* ensureAuthenticated,
     ensureAuthorized([UserType.ADMIN]), */
     DepartmentsController.create

);
departmentRoutes.delete('/delete/:id', DepartmentsController.delete);
departmentRoutes.put('/update/:id', DepartmentsController.update);
departmentRoutes.get('/show/:id', DepartmentsController.show);
departmentRoutes.get('/list', DepartmentsController.list);



export default departmentRoutes;