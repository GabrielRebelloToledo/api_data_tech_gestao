
import express from 'express';
import helmet from 'helmet';
import { initializeDatabase, startServer } from './src/shared/infra/environments/environments.js';  // Importa funções de server.js

// Rotas iniciais

import userSessions from './src/modules/user/routes/sessions.routes.js';
import userscompanie from './src/modules/user/routes/users-companie.routes.js';
import companies from './src/modules/companies/routes/companies.routes.js';
import calledRoutes from './src/modules/called/routes/called.routes.js';
import depComp from './src/modules/companies/routes/companies-departments.routes.js'
import departmentRoutes from './src/modules/departments/routes/departments.routes.js'
import situationRoutes from './src/modules/situation/routes/situations.routes.js'
import path from "path";


import corsConfig from './src/config/cors.config.js';



import uploadRoutes from './src/modules/files/routes/files.routes.js';

import cors from 'cors';



const app = express();

app.use(cors(corsConfig));
app.use(express.json());

/* app.get('/', (req, res) => {
    res.send('Olá, Mundo!');
}); */

// Servir arquivos estáticos
app.use(express.static("public/browser"));
/* app.get("*", (req, res) => {
    res.sendFile(path.resolve("public/browser/index.html"));
}); */


app.use(
    helmet({
        contentSecurityPolicy: false, // Desativa CSP
        frameguard: {
            action: 'deny', // Bloqueia frames de qualquer origem
        },
    })
);

app.use('/api/sessions', userSessions);
app.use('/api//companies', companies);
app.use('/api/usercompanies', userscompanie);
app.use('/api/upload', uploadRoutes);

app.use('/api/called', calledRoutes);

app.use('/api/compdep', depComp);
app.use('/api/departments', departmentRoutes)

app.use('/api/situations', situationRoutes)

// Inicializar o banco de dados
initializeDatabase();
// Iniciar o servidor
startServer(app);
