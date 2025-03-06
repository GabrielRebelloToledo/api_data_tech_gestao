import express from 'express';
import CalledControllerController from '../controllers/called.controller.js';
import CalledDetailsControllerController from '../controllers/called-details.controller.js';
import ensureAuthenticated from '../../../shared/middlewares/ensure-authenticated.middleware.js'
import ensureAuthorized from '../../../shared/middlewares/ensure-authorized.middleware.js'
import UserType from '../../user/enums/EUsers.js';

const calledRoutes = express.Router();
calledRoutes.post(
    '/', 
     /* ensureAuthenticated,
     ensureAuthorized([UserType.ADMIN]), */
     CalledControllerController.create

);
calledRoutes.get('/listp/:id/:type/:department/:companieId', CalledControllerController.listp);
calledRoutes.get('/listr/:id/:type/:department/:companieId', CalledControllerController.listr);
calledRoutes.get('/listm/:id/:type/:department/:companieId', CalledControllerController.listm);

calledRoutes.get('/listc/:id/:type/:department/:companieId', CalledControllerController.listc);


calledRoutes.get('/show/:id', CalledControllerController.show);
calledRoutes.put('/update/:id', CalledControllerController.update);


//Details
calledRoutes.get('/list/:id', CalledDetailsControllerController.list);
calledRoutes.post('/create', CalledDetailsControllerController.create);




export default calledRoutes;