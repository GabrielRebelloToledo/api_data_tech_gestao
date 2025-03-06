import express from 'express';
import SituationsController from '../controllers/situations.controller.js';
import ensureAuthenticated from '../../../shared/middlewares/ensure-authenticated.middleware.js'
import ensureAuthorized from '../../../shared/middlewares/ensure-authorized.middleware.js'
import UserType from '../../user/enums/EUsers.js';

const SituationsRoutes = express.Router();
SituationsRoutes.post(
    '/', 
     /* ensureAuthenticated,
     ensureAuthorized([UserType.ADMIN]), */
     SituationsController.create

);
SituationsRoutes.delete('/delete/:id', SituationsController.delete);
SituationsRoutes.put('/update/:id', SituationsController.update);
SituationsRoutes.get('/show/:id', SituationsController.show);
SituationsRoutes.get('/list', SituationsController.list);



export default SituationsRoutes;