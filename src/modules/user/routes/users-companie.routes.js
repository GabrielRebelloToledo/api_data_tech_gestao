import express from 'express';
import UsersCompanieController from '../controllers/users-companie.controller.js';
import ensureAuthenticated from '../../../shared/middlewares/ensure-authenticated.middleware.js'
import ensureAuthorized from '../../../shared/middlewares/ensure-authorized.middleware.js'
import UserType from '../enums/EUsers.js';
const userRoutes = express.Router();

userRoutes.post(
    '/', 
    /* ensureAuthenticated,
    ensureAuthorized([UserType.ADMIN]), */
    UsersCompanieController.create

);
userRoutes.get('/show/:id', UsersCompanieController.show);
userRoutes.delete('/delete/:id', UsersCompanieController.delete);
userRoutes.post('/update/:id', UsersCompanieController.update);
userRoutes.get('/show/:id', UsersCompanieController.show);
userRoutes.get('/list', UsersCompanieController.list); 



export default userRoutes;