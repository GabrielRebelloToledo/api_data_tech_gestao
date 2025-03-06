import AppDataSource from '../../../shared/infra/environments/environments.js';  // Importa a conexão do banco
import Situation from '../../../entities/situation.entities.js';
import {
    FORBIDDEN,
    UNAUTHORIZED,
} from '../../../shared/infra/constants/http-status-code.constants.js';

import AppError from '../../../shared/errors/app-error.js'; // Classe personalizada de erro
 

class DeleteSituationsService {
    constructor() {
        // Repositório do TypeORM para a entidade User
        this.companieRepository = AppDataSource.getRepository(Situation);
    
    }

     async execute(id) {
        await this.companieRepository.delete({ id: id });
      }

   
}

export default DeleteSituationsService;
