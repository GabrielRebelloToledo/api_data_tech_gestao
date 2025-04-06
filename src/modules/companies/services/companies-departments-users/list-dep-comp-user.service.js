import AppDataSource from '../../../../shared/infra/environments/environments.js';  // Importa a conexão do banco
import AppError from '../../../../shared/errors/app-error.js'; // Classe personalizada de erro
import CompDepUsers from '../../../../entities/comp-dep-users.entities.js'; // Sua entidade de usuário

import AppErrorTypes from '../../../../shared/errors/app-error-types.js';
import { NOT_FOUND } from '../../../../shared/infra/constants/http-status-code.constants.js';

class ListDepCompaniesUserService {
  constructor() {
    // Repositório do TypeORM para a entidade User
    this.companieRepository = AppDataSource.getRepository(CompDepUsers);
  }

  async execute(id) {
    /* console.log(id) */
    const user = await this.companieRepository.find({
      where: { idDepartComp: id },
      relations:['user']
    });

    /* console.log(user) */
    if (!user) {
      throw new AppError(AppErrorTypes.users.notFound, NOT_FOUND);
    }

    return user;
  }


}

export default ListDepCompaniesUserService;
