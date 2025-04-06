import AppDataSource from '../../../../shared/infra/environments/environments.js';  // Importa a conexão do banco
import AppErrorTypes from '../../../../shared/errors/app-error-types.js';
import AppError from '../../../../shared/errors/app-error.js'; // Classe personalizada de erro
import { CONFLICT } from '../../../../shared/infra/constants/http-status-code.constants.js';
import CalledDetails from '../../../../entities/called-details.entities.js';  // Sua entidade de usuário
import { Called } from '../../../../entities/called.entities.js';
import Status from '../../../../entities/status.entities.js';

class CreateCalledDetailsService {
  constructor() {
    // Repositório do TypeORM para a entidade
    this.CalledDetails = AppDataSource.getRepository(CalledDetails);
    this.calledRepository = AppDataSource.getRepository(Called);
    this.StatusRepository = AppDataSource.getRepository(Status);
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
   /*  console.log(calledCreate) */

    await this.updateStatusCall(status, calledId);

    return calledCreate;
  }


  async updateStatusCall(status, id) {

    const data = new Date();

    const called = await this.calledRepository.findOneBy({ id });

    const showstatus = await this.StatusRepository.findOne({ where: { id: status } });

    // Verificando se o chamado foi encontrado
    if (!called) {
      console.error(`Chamado com id ${id} não encontrado.`);
      return null;  // Retorna null caso não tenha encontrado o chamado
    }


    if (showstatus.close === "S") {
      called.dataFinish = data;
    }
    if (showstatus.close === "N") {
      called.dataFinish = null;
    }

    called.status = status;

    // Salvando a atualização no banco de dados
    await this.calledRepository.save(called);

  }
}

export default CreateCalledDetailsService;
