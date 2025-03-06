
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


import corsConfig from './src/config/cors.config.js';



import uploadRoutes from './src/modules/files/routes/files.routes.js';

import cors from 'cors';



const app = express();

app.use(cors(corsConfig));
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Olá, Mundo!');
});

app.use(
    helmet({
        contentSecurityPolicy: false, // Desativa CSP
        frameguard: {
            action: 'deny', // Bloqueia frames de qualquer origem
        },
    })
);

app.use('/sessions', userSessions);
app.use('/companies', companies);
app.use('/usercompanies', userscompanie);
app.use('/upload',uploadRoutes);

app.use('/called',calledRoutes);

app.use('/compdep', depComp);
app.use('/departments', departmentRoutes)

app.use('/situations', situationRoutes)

// Inicializar o banco de dados
initializeDatabase();
// Iniciar o servidor
startServer(app);
