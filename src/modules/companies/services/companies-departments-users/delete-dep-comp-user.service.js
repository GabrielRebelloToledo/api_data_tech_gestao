import AppDataSource from '../../../../shared/infra/environments/environments.js';  // Importa a conexão do banco
import CompDepUsers from '../../../../entities/comp-dep-users.entities.js';  // Sua entidade de usuário

class DeleteCompaniesService {
    constructor() {
        // Repositório do TypeORM para a entidade User
        this.companieRepository = AppDataSource.getRepository(CompDepUsers);
    
    }

     async execute(id) {
        await this.companieRepository.delete({ idDepCompUser: id });
      }

   
}

export default DeleteCompaniesService;
