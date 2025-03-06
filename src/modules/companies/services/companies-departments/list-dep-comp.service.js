import AppDataSource from '../../../../shared/infra/environments/environments.js';  // Importa a conexão do banco
import AppError from '../../../../shared/errors/app-error.js'; // Classe personalizada de erro
import CompanieDep from '../../../../entities/companies-departments.entities.js';  // Sua entidade de usuário

import AppErrorTypes from '../../../../shared/errors/app-error-types.js';
import { NOT_FOUND } from '../../../../shared/infra/constants/http-status-code.constants.js';

class ListDepCompaniesService {
  constructor() {
    // Repositório do TypeORM para a entidade User
    this.companieRepository = AppDataSource.getRepository(CompanieDep);
  }

  async execute(companieId) {
    console.log(companieId)
    const user = await this.companieRepository.find({
      where: { companieId: companieId },
      relations:['department']
    });

    if (!user) {
      throw new AppError(AppErrorTypes.users.notFound, NOT_FOUND);
    }

    return user;
  }


}

export default ListDepCompaniesService;
