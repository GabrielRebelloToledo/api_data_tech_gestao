import AppDataSource from '../../../../shared/infra/environments/environments.js';  // Importa a conexão do banco
import Report from '../../../../entities/report-arquivos.entities.js';
import AppErrorTypes from '../../../../shared/errors/app-error-types.js';
import AppError from '../../../../shared/errors/app-error.js'; // Classe personalizada de erro
import { CONFLICT } from '../../../../shared/infra/constants/http-status-code.constants.js';
import HashProvider from '../../../../shared/providers/bcrypt-hash.provider.js';
const hashProvider = new HashProvider();


class CreateReportService {
    constructor() {
        // Repositório do TypeORM para a entidade Userx


        this.reportRepository = AppDataSource.getRepository(Report);
    }

    async execute(dados) {
        // Criar o novo relatorio
        const report = this.reportRepository.create( dados );
        // Salvar no banco
        const reportCreate = await this.reportRepository.save(report);
        return report;
    }

}

export default CreateReportService;
