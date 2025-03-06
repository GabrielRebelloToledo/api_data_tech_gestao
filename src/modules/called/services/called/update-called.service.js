import AppDataSource from '../../../../shared/infra/environments/environments.js';  // Importa a conexão do banco
import Called from '../../../../entities/called.entities.js';  // Sua entidade de usuário
import AppError from '../../../../shared/errors/app-error.js'; // Classe personalizada de erro
import AppErrorTypes from '../../../../shared/errors/app-error-types.js';
import { CONFLICT } from '../../../../shared/infra/constants/http-status-code.constants.js';
import ShowCallService from './show-called.service.js';
const show = new ShowCallService();


class UpdateCalledService {
  constructor() {
    // Repositório do TypeORM para a entidade companie
    this.calledRepository = AppDataSource.getRepository(Called);
  }

  async execute(req) {

    const call = await this.getcallById(req.id);

    console.log("Chegando na minha consulta")
    console.log(call)
    if (!call) {
      return {success: false, message: new AppError(AppErrorTypes.companie.notFound, NOT_FOUND)};
    }  

    
    console.log("Chegando no meu req")
    console.log(req.id)

    call.status = "A";
    call.userIdResp = req.userId;
    // Salva e retorna o chamado com dono chamado atualizado

     console.log(call)
    return await this.calledRepository.save(call);
  }


  async getcallById(id) {
    
    const called = await show.executeShowUpdateResp(id);



     if (!called) {
      return { success: false, message: new AppError(AppErrorTypes.companie.notFound, NOT_FOUND) };
    }else{
      return called;
    }
  }
}

export default UpdateCalledService;
