import AppDataSource from '../../../../shared/infra/environments/environments.js';  // Importa a conexão do banco
import AppError from '../../../../shared/errors/app-error.js'; // Classe personalizada de erro
import CalledDetails from '../../../../entities/called-details.entities.js';  // Sua entidade de usuário
import AppErrorTypes from '../../../../shared/errors/app-error-types.js';
import { NOT_FOUND } from '../../../../shared/infra/constants/http-status-code.constants.js';
import { In } from 'typeorm';

class ListDetailCalledService {
    constructor() {
        // Repositório do TypeORM para a entidade User
        this.companieCalled = AppDataSource.getRepository(CalledDetails);
    }

    async execute(id) {


        const calleds = await this.companieCalled.find({
            where: { calledId: id },
            relations: ['call']
        });

        /* if (!calleds.length) {
            throw new AppError(AppErrorTypes.users.notFound, NOT_FOUND);
        } */

        return calleds;
    }


}

export default ListDetailCalledService;
