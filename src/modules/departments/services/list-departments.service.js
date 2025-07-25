import AppDataSource from '../../../shared/infra/environments/environments.js';  // Importa a conexão do banco
import AppError from '../../../shared/errors/app-error.js'; // Classe personalizada de erro
import Department from '../../../entities/departments.entities.js';
import AppErrorTypes from '../../../shared/errors/app-error-types.js';
import { NOT_FOUND } from '../../../shared/infra/constants/http-status-code.constants.js';

class ListDepartmentService {
    constructor() {
        // Repositório do TypeORM para a entidade User
       this.companieRepository = AppDataSource.getRepository(Department);
    }

     async execute(userId) {
        const user = await this.companieRepository.find();
    
        if (!user) {
          throw new AppError(AppErrorTypes.users.notFound, NOT_FOUND);
        }
    
        return user;
      }

   
}

export default ListDepartmentService;
