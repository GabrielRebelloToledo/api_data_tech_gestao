import AppDataSource from '../../../../shared/infra/environments/environments.js';  // Importa a conexão do banco

import {
    FORBIDDEN,
    UNAUTHORIZED,
} from '../../../../shared/infra/constants/http-status-code.constants.js';

import AppError from '../../../../shared/errors/app-error.js'; // Classe personalizada de erro
import Department from '../../../../entities/departments.entities.js'; // Sua entidade de usuário
import Report from '../../../../entities/report-cab.entities.js';

class DeleteReportService {
    constructor() {
        // Repositório do TypeORM para a entidade User
       this.reportRepository = AppDataSource.getRepository(Report);
    
    }

     async execute(id) {
        await this.companieRepository.delete({ id: id });
      }

   
}

export default DeleteReportService;
