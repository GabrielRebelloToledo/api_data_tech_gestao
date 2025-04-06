import AppDataSource from '../../../shared/infra/environments/environments.js';  // Importa a conexão do banco
import AppError from '../../../shared/errors/app-error.js'; // Classe personalizada de erro
import Status from '../../../entities/status.entities.js';

import AppErrorTypes from '../../../shared/errors/app-error-types.js';
import { NOT_FOUND } from '../../../shared/infra/constants/http-status-code.constants.js';

class DeleteStatusService {
    constructor() {
        this.StatusRepository = AppDataSource.getRepository(Status);

    }

    async execute(id) {

        try {
            const status = await this.StatusRepository.findOne({ where: { id: id } });

            const statusDelete = await this.StatusRepository.remove(status);

            if (statusDelete.affected === 0) {

                return { success: false, message: "Status não Encontrado!" }
            }

            return { success: true, message: "Status Excluído!" }

        } catch (error) {

            return { success: false, message: "Não é possível excluir este Status." + error }
        }

    }
}

export default DeleteStatusService;
