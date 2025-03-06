import AppDataSource from '../../../shared/infra/environments/environments.js';  // Importa a conexão do banco

import {
    FORBIDDEN,
    UNAUTHORIZED,
} from '../../../shared/infra/constants/http-status-code.constants.js';

import AppError from '../../../shared/errors/app-error.js'; // Classe personalizada de erro
import Companie from '../../../entities/companie.entities.js';  // Sua entidade de usuário

class DeleteCompaniesService {
    constructor() {
        // Repositório do TypeORM para a entidade User
        this.companieRepository = AppDataSource.getRepository(Companie);
    
    }

     async execute(id) {
        await this.companieRepository.delete({ id: id });
      }

   
}

export default DeleteCompaniesService;
