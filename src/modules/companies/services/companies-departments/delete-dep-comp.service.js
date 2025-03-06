import AppDataSource from '../../../../shared/infra/environments/environments.js';  // Importa a conexão do banco
import CompanieDep from '../../../../entities/companies-departments.entities.js';  // Sua entidade de usuário


class DeleteDepCompaniesService {
    constructor() {
        // Repositório do TypeORM para a entidade User
        this.companieRepository = AppDataSource.getRepository(CompanieDep);
    
    }

     async execute(id) {
        await this.companieRepository.delete({ id: id });
      }

}

export default DeleteDepCompaniesService;
