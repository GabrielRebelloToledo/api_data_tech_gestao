import express from 'express';
import CompaniesControllerController from '../controllers/companies.controller.js';
import ensureAuthenticated from '../../../shared/middlewares/ensure-authenticated.middleware.js'
import ensureAuthorized from '../../../shared/middlewares/ensure-authorized.middleware.js'
import UserType from '../../user/enums/EUsers.js';

const companiesRoutes = express.Router();
companiesRoutes.post(
    '/', 
     /* ensureAuthenticated,
     ensureAuthorized([UserType.ADMIN]), */
    CompaniesControllerController.create

);
companiesRoutes.delete('/delete/:id', CompaniesControllerController.delete);
companiesRoutes.put('/update/:id', CompaniesControllerController.update);
companiesRoutes.get('/show/:id', CompaniesControllerController.show);
companiesRoutes.get('/list', CompaniesControllerController.list);



export default companiesRoutes;