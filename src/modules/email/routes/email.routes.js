import express from 'express';
import EmailController from '../controller/email.controller.js';


const emailRoutes = express.Router();

    emailRoutes.post(
        '/',
        EmailController.create
    );

    



export default emailRoutes;