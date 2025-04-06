import express from 'express';
import CompaniesDepartController from '../controllers/companies-departments.controller.js';
import ensureAuthenticated from '../../../shared/middlewares/ensure-authenticated.middleware.js'
import ensureAuthorized from '../../../shared/middlewares/ensure-authorized.middleware.js'
import UserType from '../../user/enums/EUsers.js';

const companiesDepartRoutes = express.Router();
companiesDepartRoutes.post(
    '/',
    ensureAuthenticated,
    ensureAuthorized([UserType.ADMIN]),
    CompaniesDepartController.create

);
companiesDepartRoutes.delete('/delete/:id', 
    ensureAuthenticated,
    ensureAuthorized([UserType.ADMIN]), 
    CompaniesDepartController.delete);

companiesDepartRoutes.put('/update/:id',
    ensureAuthenticated,
    ensureAuthorized([UserType.ADMIN]), 
    CompaniesDepartController.update);

companiesDepartRoutes.get('/show/:id', 
    ensureAuthenticated,
    ensureAuthorized([UserType.ADMIN]), 
    CompaniesDepartController.show);

companiesDepartRoutes.get('/list/:id', 
    ensureAuthenticated,
    ensureAuthorized([UserType.ADMIN]), 
    CompaniesDepartController.list);


export default companiesDepartRoutes;