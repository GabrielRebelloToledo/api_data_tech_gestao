import express from 'express';
import CompaniesDepartUsersController from '../controllers/companies-departments-users.controller.js';
import ensureAuthenticated from '../../../shared/middlewares/ensure-authenticated.middleware.js'
import ensureAuthorized from '../../../shared/middlewares/ensure-authorized.middleware.js'
import UserType from '../../user/enums/EUsers.js';

const companiesDepartUsersRoutes = express.Router();

    companiesDepartUsersRoutes.post(
        '/',
        ensureAuthenticated,
        ensureAuthorized([UserType.ADMIN]),
        CompaniesDepartUsersController.create
    );

    companiesDepartUsersRoutes.delete('/delete/:id',
    ensureAuthenticated,
    ensureAuthorized([UserType.ADMIN]),
    CompaniesDepartUsersController.delete);

    companiesDepartUsersRoutes.get('/list/:id',
    ensureAuthenticated,
    ensureAuthorized([UserType.ADMIN]),
    CompaniesDepartUsersController.list);

    companiesDepartUsersRoutes.get('/listdepcall/:id',
    ensureAuthenticated,
    ensureAuthorized([UserType.ADMIN]),
    CompaniesDepartUsersController.listCalledDeps);





export default companiesDepartUsersRoutes;