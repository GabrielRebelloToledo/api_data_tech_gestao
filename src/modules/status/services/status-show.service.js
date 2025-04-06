import AppDataSource from '../../../shared/infra/environments/environments.js';  // Importa a conexão do banco
import AppError from '../../../shared/errors/app-error.js'; // Classe personalizada de erro
import Status from '../../../entities/status.entities.js';  // Sua entidade de usuário

import AppErrorTypes from '../../../shared/errors/app-error-types.js';
import { NOT_FOUND } from '../../../shared/infra/constants/http-status-code.constants.js';

class ShowStatusService {
    constructor() {
        this.StatusRepository = AppDataSource.getRepository(Status);
    }

    async execute(statusId) {

        /* console.log(processId, stepId) */

        const showstatus = await this.StatusRepository.find({
            where: { id: statusId }
        });
        /* console.log(processShow) */
        return showstatus;
    }

}

export default ShowStatusService;
