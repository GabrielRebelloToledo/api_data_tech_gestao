import express from 'express';
import StatusController from '../controllers/status.controller.js';
import ensureAuthenticated from '../../../shared/middlewares/ensure-authenticated.middleware.js'
import ensureAuthorized from '../../../shared/middlewares/ensure-authorized.middleware.js'
import UserType from '../../user/enums/EUsers.js';

const statusRoutes = express.Router();

statusRoutes.post('/',
   /*  ensureAuthenticated,
    ensureAuthorized([UserType.ADMIN]), */
    StatusController.create);


statusRoutes.post('/update',
    /* ensureAuthenticated,
    ensureAuthorized([UserType.ADMIN]), */
    StatusController.update);


statusRoutes.get('/list',
    /* ensureAuthenticated,
    ensureAuthorized([UserType.ADMIN, UserType.USER]), */
    StatusController.list);

statusRoutes.get('/show/:processId/:stepId',
    ensureAuthenticated,
    ensureAuthorized([UserType.ADMIN, UserType.USER]),
    StatusController.show);


statusRoutes.delete('/delete/:id',
    ensureAuthenticated,
    ensureAuthorized([UserType.ADMIN]),
    StatusController.delete);



export default statusRoutes;