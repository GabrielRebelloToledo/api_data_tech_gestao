import AppDataSource from '../../../../shared/infra/environments/environments.js';  // Importa a conexão do banco
import AppError from '../../../../shared/errors/app-error.js'; // Classe personalizada de erro
import Called from '../../../../entities/called.entities.js';  // Sua entidade de usuário
import AppErrorTypes from '../../../../shared/errors/app-error-types.js';
import { NOT_FOUND } from '../../../../shared/infra/constants/http-status-code.constants.js';
import { getConsultaEmailInicial } from './called_email_start.js';



class ShowCallService {
    constructor() {
        // Repositório do TypeORM para a entidade User
        this.companieCalled = AppDataSource.getRepository(Called);
    }

    async execute(id) {
        const companie = await this.companieCalled.findOne({
            where: { id },
            relations: ['primaryCompanie', 'user', 'statusId', 'userResp']
        });

        if (!companie) {
            /*  throw new AppError(AppErrorTypes.users.notFound, NOT_FOUND); */
            return { success: false, message: new AppError(AppErrorTypes.users.notFound, NOT_FOUND) };
        }


        return companie;
    }

    async executeShowUpdateResp(id) {
        const companie = await this.companieCalled.findOne({
            where: { id }
        });

        if (!companie) {
            /*  throw new AppError(AppErrorTypes.users.notFound, NOT_FOUND); */
            return { success: false, message: new AppError(AppErrorTypes.users.notFound, NOT_FOUND) };
        }
        return companie;
    }

    async getInfosEmailInicial(id) {

        const query = getConsultaEmailInicial();
        const calleds = await AppDataSource.query(query, id);

        if (!calleds) {
            /*  throw new AppError(AppErrorTypes.users.notFound, NOT_FOUND); */
            return { success: false, message: new AppError(AppErrorTypes.users.notFound, NOT_FOUND) };
        }

        return calleds;
    }


}

export default ShowCallService;
