import AppDataSource from '../../../../shared/infra/environments/environments.js';  // Importa a conexão do banco
import AppError from '../../../../shared/errors/app-error.js'; // Classe personalizada de erro
import Report from '../../../../entities/report-cab.entities.js';
import AppErrorTypes from '../../../../shared/errors/app-error-types.js';
import { NOT_FOUND } from '../../../../shared/infra/constants/http-status-code.constants.js';

class ListReportService {
    constructor() {
        // Repositório do TypeORM para a entidade User
        this.reportRepository = AppDataSource.getRepository(Report);
    }

     async execute() {
        const user = await this.reportRepository.find();
    
        if (!user) {
          throw new AppError(AppErrorTypes.users.notFound, NOT_FOUND);
        }
    
        return user;
      }

   
}

export default ListReportService;
