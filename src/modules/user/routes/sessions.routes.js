import express from 'express';
import SessionsController from '../controllers/sessions.controller.js';
import ensureAuthenticated from '../../../shared/middlewares/ensure-authenticated.middleware.js'
import ensureAuthorized from '../../../shared/middlewares/ensure-authorized.middleware.js'

const userSessions = express.Router();

userSessions.post('/', SessionsController.signIn);
userSessions.post(
    '/create', 
    /* ensureAuthenticated,
    ensureAuthorized([UserType.ADMIN]), */
    SessionsController.create

);
userSessions.delete('/delete/:id', SessionsController.delete);
userSessions.post('/update/:id', SessionsController.update);
userSessions.get('/show/:id', SessionsController.show);
userSessions.get('/list', SessionsController.list);
userSessions.get('/salesman/list', SessionsController.list);

export default userSessions;