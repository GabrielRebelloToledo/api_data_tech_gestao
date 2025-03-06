import AppDataSource from '../../../shared/infra/environments/environments.js';  // Importa a conexão do banco
import Companie from '../../../entities/companie.entities.js';  // Sua entidade de usuário
import AppErrorTypes from '../../../shared/errors/app-error-types.js';
import AppError from '../../../shared/errors/app-error.js'; // Classe personalizada de erro
import { CONFLICT } from '../../../shared/infra/constants/http-status-code.constants.js';
import HashProvider from '../../../shared/providers/bcrypt-hash.provider.js';
const hashProvider = new HashProvider();


class CreateCompanieService {
    constructor() {
        // Repositório do TypeORM para a entidade Userx
        this.companieRepository = AppDataSource.getRepository(Companie);
      }
    
      async execute({ name, cnpj, adress, email, telephone }) {
        // Verificar se o usuário já existe
         const companieExists = await this.companieRepository.findOneBy({ cnpj });
    
         if (companieExists) {
         // throw new AppError(AppErrorTypes.users.emailAlreadyInUse, CONFLICT);
          return { success: false, message: new AppError(AppErrorTypes.companie.companieAlreadyInUse, CONFLICT) };
        }
    
        
        // Criar o novo usuário
        const companie = this.companieRepository.create({
            name, cnpj, adress, email, telephone
        });
    
        // Salvar no banco
       const companieCreate = await this.companieRepository.save(companie);
        console.log(companieCreate)
        // Retornar a empresa cadastrada
        return companie;
      }
}

export default CreateCompanieService;
