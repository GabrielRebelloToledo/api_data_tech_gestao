import express from 'express';
import ReportController from '../controllers/report/report.controller.js';
import ensureAuthenticated from '../../../shared/middlewares/ensure-authenticated.middleware.js'
import ensureAuthorized from '../../../shared/middlewares/ensure-authorized.middleware.js'
import UserType from '../../user/enums/EUsers.js';

const reportRoutes = express.Router();

reportRoutes.post(
    '/create',
    ensureAuthenticated,
    ensureAuthorized([UserType.ADMIN]),
    ReportController.create
);



reportRoutes.get('/show/:id',
    ensureAuthenticated,
    ensureAuthorized([UserType.ADMIN]),
    ReportController.show);

reportRoutes.get('/list',
    ensureAuthenticated,
    ensureAuthorized([UserType.ADMIN]),
    ReportController.list);


reportRoutes.post('/update/:id',
    ensureAuthenticated,
    ensureAuthorized([UserType.ADMIN]),
    ReportController.update);



export default reportRoutes;