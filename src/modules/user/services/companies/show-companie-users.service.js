import AppDataSource from '../../../../shared/infra/environments/environments.js';  // Importa a conexão do banco
import AppError from '../../../../shared/errors/app-error.js'; // Classe personalizada de erro
import UserCompanie from '../../../../entities/user-companie.entities.js'; // Sua entidade de usuário
import AppErrorTypes from '../../../../shared/errors/app-error-types.js';
import { NOT_FOUND } from '../../../../shared/infra/constants/http-status-code.constants.js';

class ShowUsersCompanieService {
    constructor() {
        // Repositório do TypeORM para a entidade User
        this.userRepository = AppDataSource.getRepository(UserCompanie);
    }

    async execute(id) {
        const user = await this.userRepository.find({
            where: { userId: id },
            relations: ['companie'],  // Buscando os dados relacionados
            select: {
                companie: true,  // Retorna apenas os dados da companie
              },
        });

        if (!user) {
            /*  throw new AppError(AppErrorTypes.users.notFound, NOT_FOUND); */
            return { success: false, message: new AppError(AppErrorTypes.users.notFound, NOT_FOUND) };
        }

        if (user.length > 0) {
            const companies = user.map(user => ({ ...user.companie })); // Extrai todas as empresas associadas
            console.log(companies); // Retorna todas as companhias do usuário
            return  companies
          } else {
            console.log('Nenhuma companhia encontrada para este usuário.');
            return  []
          }

        
    }


}

export default ShowUsersCompanieService;
