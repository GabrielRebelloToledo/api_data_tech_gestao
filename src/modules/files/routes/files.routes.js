import express from 'express';
import FilesController from '../controller/files.controller.js';
import ensureAuthenticated from '../../../shared/middlewares/ensure-authenticated.middleware.js'
import ensureAuthorized from '../../../shared/middlewares/ensure-authorized.middleware.js'
import UserType from '../../user/enums/EUsers.js';
import multer from 'multer';
import fs from 'fs';

const filesRoutes = express.Router();



// Cria a pasta se ela não existir
if (!fs.existsSync(process.env.CAMINHOFILES + '/gestao')) {
    fs.mkdirSync(process.env.CAMINHOFILES + '/gestao', { recursive: true });
} 

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, process.env.CAMINHOFILES + '/gestao'); // Pasta onde os arquivos serão salvos
    },
    filename: (req, file, cb) => {
        // Cria um nome único para o arquivo, mantendo a extensão original
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

// Inicializa o multer com a configuração de storage
const upload = multer({ storage });


filesRoutes.post('/',
    /* ensureAuthenticated,
    ensureAuthorized([UserType.ADMIN]), */
    upload.single('arquivo'),
    FilesController.create);



filesRoutes.delete('/delete/:filename',
    /* ensureAuthenticated,
    ensureAuthorized([UserType.ADMIN]), */
    FilesController.delete);


filesRoutes.get('/show/:fileName', FilesController.show);


export default filesRoutes;