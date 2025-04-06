import express from 'express';
import CalledControllerController from '../controllers/called.controller.js';
import CalledDetailsControllerController from '../controllers/called-details.controller.js';
import ensureAuthenticated from '../../../shared/middlewares/ensure-authenticated.middleware.js'
import ensureAuthorized from '../../../shared/middlewares/ensure-authorized.middleware.js'
import UserType from '../../user/enums/EUsers.js';

const calledRoutes = express.Router();
calledRoutes.post(
    '/',
    ensureAuthenticated,
    ensureAuthorized([UserType.ADMIN, UserType.USER]),
    CalledControllerController.create

);
calledRoutes.get('/listp/:id/:type/:department/:companieId', ensureAuthenticated,
    ensureAuthorized([UserType.ADMIN, UserType.USER]), CalledControllerController.listp);
calledRoutes.get('/listr/:id/:type/:department/:companieId', ensureAuthenticated,
    ensureAuthorized([UserType.ADMIN, UserType.USER]), CalledControllerController.listr);
calledRoutes.get('/listm/:id/:type/:department/:companieId', ensureAuthenticated,
    ensureAuthorized([UserType.ADMIN, UserType.USER]), CalledControllerController.listm);

calledRoutes.get('/listc/:id/:type/:department/:companieId', ensureAuthenticated,
    ensureAuthorized([UserType.ADMIN, UserType.USER]), CalledControllerController.listc);


calledRoutes.get('/show/:id', ensureAuthenticated,
    ensureAuthorized([UserType.ADMIN, UserType.USER]), CalledControllerController.show);
calledRoutes.put('/update/:id', ensureAuthenticated,
    ensureAuthorized([UserType.ADMIN, UserType.USER]), CalledControllerController.update);


//Details
calledRoutes.get('/list/:id', ensureAuthenticated,
    ensureAuthorized([UserType.ADMIN, UserType.USER]), CalledDetailsControllerController.list);
calledRoutes.post('/create', ensureAuthenticated,
    ensureAuthorized([UserType.ADMIN, UserType.USER]), CalledDetailsControllerController.create);




export default calledRoutes;