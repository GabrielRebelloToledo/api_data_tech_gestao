import AppDataSource from '../../../shared/infra/environments/environments.js';  // Importa a conexão do banco
import AppError from '../../../shared/errors/app-error.js'; // Classe personalizada de erro
import Status from '../../../entities/status.entities.js';

import AppErrorTypes from '../../../shared/errors/app-error-types.js';
import { NOT_FOUND } from '../../../shared/infra/constants/http-status-code.constants.js';

class UpdateStatusService {
    constructor() {
        this.StatusRepository = AppDataSource.getRepository(Status);

    }

    async execute({ id, status, close }) {

        // Salvar no banco
        const statusc = await this.StatusRepository.save({ id, status, close });

        if (!statusc) {
            return { success: false, message: "Status não criado!" }
        }

        return { success: true, message: "Status criado!" }

    }
}

export default UpdateStatusService;
