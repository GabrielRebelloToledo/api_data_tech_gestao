import express from 'express';
import SessionsController from '../controllers/sessions.controller.js';
import ensureAuthenticated from '../../../shared/middlewares/ensure-authenticated.middleware.js'
import ensureAuthorized from '../../../shared/middlewares/ensure-authorized.middleware.js'
import UserType from '../enums/EUsers.js';
const userSessions = express.Router();

userSessions.post('/', SessionsController.signIn);
    userSessions.post(
        '/create',
        ensureAuthenticated,
        ensureAuthorized([UserType.ADMIN]),
        SessionsController.create
    );
    userSessions.delete('/delete/:id', 
    ensureAuthenticated,
    ensureAuthorized([UserType.ADMIN]), 
    SessionsController.delete);

    userSessions.post('/update/:id', 
    ensureAuthenticated,
    ensureAuthorized([UserType.ADMIN, UserType.USER]), 
    SessionsController.update);

    userSessions.get('/show/:id', 
    ensureAuthenticated,
    ensureAuthorized([UserType.ADMIN]), 
    SessionsController.show);

    userSessions.get('/list', 
    ensureAuthenticated,
    ensureAuthorized([UserType.ADMIN]), 
    SessionsController.list);

    userSessions.get('/salesman/list',
    ensureAuthenticated,
    ensureAuthorized([UserType.ADMIN, UserType.USER]),  
    SessionsController.list);

export default userSessions;