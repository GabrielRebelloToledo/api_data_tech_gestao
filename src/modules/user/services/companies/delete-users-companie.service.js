import AppDataSource from '../../../../shared/infra/environments/environments.js';  // Importa a conexão do banco

import UserCompanie from '../../../../entities/user-companie.entities.js';




class DeleteUsersCompanieService {
    constructor() {
        // Repositório do TypeORM para a entidade User
        this.userRepository = AppDataSource.getRepository(UserCompanie);

    }

    async execute(id, idcomp) {
        console.log("Cheguei no delete")
        await this.userRepository.delete({ userId: id, companieId: idcomp });
    }

}

export default DeleteUsersCompanieService;
