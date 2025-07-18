import express from 'express';
import ReportFileController from '../controllers/report-files/report-file.controller.js';
import ensureAuthenticated from '../../../shared/middlewares/ensure-authenticated.middleware.js'
import ensureAuthorized from '../../../shared/middlewares/ensure-authorized.middleware.js'
import UserType from '../../user/enums/EUsers.js';
import multer from 'multer';
import fs from 'fs';
import 'dotenv/config';

const reportFileRoutes = express.Router();

// Caminho base onde os arquivos serão salvos
const UPLOADS_BASE_PATH = process.env.CAMINHOFILES + '/temp';

// Função que valida/cria a pasta se necessário
function validaPasta(pastaCompleta) {
    if (!fs.existsSync(pastaCompleta)) {
        fs.mkdirSync(pastaCompleta, { recursive: true });
    }
}

// Configuração do armazenamento
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        //console.log(req.file)

        //const codigoRelatorio = req.body.idCabReport || 'default'; // ou req.params.codigoRelatorio
        //const pastaDestino = path.join(UPLOADS_BASE_PATH, codigoRelatorio);
        const pastaDestino = UPLOADS_BASE_PATH;

        validaPasta(pastaDestino); // Cria a pasta se não existir
        cb(null, pastaDestino);
    },

    filename: (req, file, cb) => {
        const timestamp = Date.now();
        const nomeArquivo = `${Date.now()}-${file.originalname}`;
        cb(null, nomeArquivo);
    }
});

// Inicializa o multer
const upload = multer({ storage });


// Rotas
reportFileRoutes.post('/upload',
    /* ensureAuthenticated,
    ensureAuthorized([UserType.ADMIN]), */
    upload.single('arquivo'),
    ReportFileController.create);


reportFileRoutes.post('/show/:idCabReport',
    ensureAuthenticated,
    ensureAuthorized([UserType.ADMIN]),
    ReportFileController.show);

reportFileRoutes.get('/list/:id',
    ensureAuthenticated,
    ensureAuthorized([UserType.ADMIN]),
    ReportFileController.list);


reportFileRoutes.post('/update',
    ensureAuthenticated,
    ensureAuthorized([UserType.ADMIN]),
    ReportFileController.update);



reportFileRoutes.post(
    '/delete',
    ensureAuthenticated,
    ensureAuthorized([UserType.ADMIN]),
    ReportFileController.delete
);



export default reportFileRoutes;