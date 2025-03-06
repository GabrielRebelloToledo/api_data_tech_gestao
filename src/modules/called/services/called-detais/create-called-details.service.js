import AppDataSource from '../../../../shared/infra/environments/environments.js';  // Importa a conexão do banco
import AppErrorTypes from '../../../../shared/errors/app-error-types.js';
import AppError from '../../../../shared/errors/app-error.js'; // Classe personalizada de erro
import { CONFLICT } from '../../../../shared/infra/constants/http-status-code.constants.js';
import CalledDetails from '../../../../entities/called-details.entities.js';  // Sua entidade de usuário



class CreateCalledDetailsService {
  constructor() {
    // Repositório do TypeORM para a entidade
    this.CalledDetails = AppDataSource.getRepository(CalledDetails);
  }

  async execute({ calledId, status, detail, file1, file2, file3, file4 }) {


    // Criar o novo chamado
    const called = this.CalledDetails.create({
      calledId,
      status,
      detail,
      file1,
      file2,
      file3,
      file4
    });

    // Salvar no banco
    const calledCreate = await this.CalledDetails.save(called);
    console.log(calledCreate)

    return calledCreate;
  }
}

export default CreateCalledDetailsService;
