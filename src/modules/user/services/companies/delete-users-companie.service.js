import AppDataSource from '../../../../shared/infra/environments/environments.js';  // Importa a conexão do banco

import { User } from '../../../../entities/user.entities.js';




class DeleteUsersCompanieService {
    constructor() {
        // Repositório do TypeORM para a entidade User
        this.userRepository = AppDataSource.getRepository(User);
    
    }
    
     async execute(id) {
        console.log("Cheguei no delete")
        await this.userRepository.delete({ id: id });
      }

}

export default DeleteUsersCompanieService;
