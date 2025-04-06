import express from 'express';
import UsersCompanieController from '../controllers/users-companie.controller.js';
import ensureAuthenticated from '../../../shared/middlewares/ensure-authenticated.middleware.js'
import ensureAuthorized from '../../../shared/middlewares/ensure-authorized.middleware.js'
import UserType from '../enums/EUsers.js';
const userRoutes = express.Router();

userRoutes.post(
    '/',
    ensureAuthenticated,
    ensureAuthorized([UserType.ADMIN]),
    UsersCompanieController.create

);
userRoutes.get('/show/:id', ensureAuthorized([UserType.ADMIN]),UsersCompanieController.show);
userRoutes.delete('/delete/:id/:idcomp', ensureAuthorized([UserType.ADMIN]),UsersCompanieController.delete);
userRoutes.post('/update/:id',ensureAuthorized([UserType.ADMIN]), UsersCompanieController.update);
userRoutes.get('/show/:id',ensureAuthorized([UserType.ADMIN]), UsersCompanieController.show);
userRoutes.get('/list', ensureAuthorized([UserType.ADMIN]),UsersCompanieController.list);



export default userRoutes;