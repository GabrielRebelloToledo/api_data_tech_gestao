import AppDataSource from '../../../../shared/infra/environments/environments.js';  // Importa a conexão do banco
import AppError from '../../../../shared/errors/app-error.js'; // Classe personalizada de erro
import AppErrorTypes from '../../../../shared/errors/app-error-types.js';
import { NOT_FOUND } from '../../../../shared/infra/constants/http-status-code.constants.js';
import { getConsultaEmailDetails } from './called_detais_email.js';

class ShowCallService {
  constructor() {}

  async getInfosEmailDetails(idCalled, IdCalledDetails) {

    const query = getConsultaEmailDetails();
    const calledDetails = await AppDataSource.query(query, [idCalled, IdCalledDetails]);

    if (!calledDetails) {
      /*  throw new AppError(AppErrorTypes.users.notFound, NOT_FOUND); */
      return { success: false, message: new AppError(AppErrorTypes.users.notFound, NOT_FOUND) };
    }

    return calledDetails;
  }


}

export default ShowCallService;
