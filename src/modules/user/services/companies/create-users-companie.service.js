import AppDataSource from '../../../../shared/infra/environments/environments.js';  // Importa a conexão do banco
import UserCompanie from '../../../../entities/user-companie.entities.js';  // Sua entidade de usuário
import AppErrorTypes from '../../../../shared/errors/app-error-types.js';
import AppError from '../../../../shared/errors/app-error.js'; // Classe personalizada de erro
import { CONFLICT } from '../../../../shared/infra/constants/http-status-code.constants.js';
import HashProvider from '../../../../shared/providers/bcrypt-hash.provider.js';
const hashProvider = new HashProvider();


class CreateUsersCompanieService {
    constructor() {
        // Repositório do TypeORM para a entidade User
        this.userRepository = AppDataSource.getRepository(UserCompanie);
    }

    async execute({ userId, companieId }) {

        // Criar o novo usuário
        const usercompaniecreate = this.userRepository.create({
            userId,
            companieId
        });

        // Salvar no banco
        const usercompanie = await this.userRepository.save(usercompaniecreate);
        console.log(usercompanie);
        return usercompanie;
    }
}

export default CreateUsersCompanieService;
