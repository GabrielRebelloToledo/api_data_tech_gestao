import AppDataSource from '../../../shared/infra/environments/environments.js';  // Importa a conexão do banco
import Department from '../../../entities/departments.entities.js';  // Sua entidade de usuário
import AppErrorTypes from '../../../shared/errors/app-error-types.js';
import AppError from '../../../shared/errors/app-error.js'; // Classe personalizada de erro
import { CONFLICT } from '../../../shared/infra/constants/http-status-code.constants.js';
import HashProvider from '../../../shared/providers/bcrypt-hash.provider.js';
const hashProvider = new HashProvider();


class CreateDepartmentService {
    constructor() {
        // Repositório do TypeORM para a entidade Userx
        this.companieRepository = AppDataSource.getRepository(Department);
      }
    
      async execute({ department }) {
        // Verificar se o usuário já existe
         const companieExists = await this.companieRepository.findOneBy({ department });
    
         if (companieExists) {
         // throw new AppError(AppErrorTypes.users.emailAlreadyInUse, CONFLICT);
          return { success: false, message: new AppError(AppErrorTypes.companie.companieAlreadyInUse, CONFLICT) };
        }
    
        
        // Criar o novo usuário
        const companie = this.companieRepository.create({
          department
        });
        

        // Salvar no banco
       const companieCreate = await this.companieRepository.save(companie);
       console.log("Cheguei aqui")
        console.log(companieCreate)
        // Retornar a empresa cadastrada
        return companie;
      }
}

export default CreateDepartmentService;
