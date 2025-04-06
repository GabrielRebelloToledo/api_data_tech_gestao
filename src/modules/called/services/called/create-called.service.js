import AppDataSource from '../../../../shared/infra/environments/environments.js';  // Importa a conexão do banco
import AppErrorTypes from '../../../../shared/errors/app-error-types.js';
import AppError from '../../../../shared/errors/app-error.js'; // Classe personalizada de erro
import { CONFLICT } from '../../../../shared/infra/constants/http-status-code.constants.js';
import { Called } from '../../../../entities/called.entities.js';



class CreateCalledService {
    constructor() {
        // Repositório do TypeORM para a entidade
        this.companieCalled = AppDataSource.getRepository(Called);
      }
    
      async execute({ userId,companieIdP, companieIdS,idDepCall, email, telephone,reason, file1, file2, file3, file4, status }) {
    
        
        // Criar o novo chamado
        const called = this.companieCalled.create({
            userId,
            companieIdP,
            companieIdS,
            idDepCall,
            email, 
            telephone,
            reason, 
            file1, 
            file2, 
            file3, 
            file4, 
            status
        });
    
        // Salvar no banco
       const calledCreate = await this.companieCalled.save(called);
       /*  console.log(calledCreate) */
        // Retornar a empresa cadastrada
        return calledCreate;
      }
}

export default CreateCalledService;
