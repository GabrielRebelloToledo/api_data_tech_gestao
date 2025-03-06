import AppDataSource from '../../../shared/infra/environments/environments.js';  // Importa a conexão do banco
import AppError from '../../../shared/errors/app-error.js'; // Classe personalizada de erro
import Department from '../../../entities/departments.entities.js';
import AppErrorTypes from '../../../shared/errors/app-error-types.js';
import { NOT_FOUND } from '../../../shared/infra/constants/http-status-code.constants.js';

class ShowDepartmentService {
    constructor() {
        // Repositório do TypeORM para a entidade User
        this.companieRepository = AppDataSource.getRepository(Department);
    }

     async execute(id) {
        const companie = await this.companieRepository.findOneBy({ id })
    
        if (!companie) {
         /*  throw new AppError(AppErrorTypes.users.notFound, NOT_FOUND); */
          return { success: false, message: new AppError(AppErrorTypes.users.notFound, NOT_FOUND)};
        }
    
        return companie;
      }

   
}

export default ShowDepartmentService;
