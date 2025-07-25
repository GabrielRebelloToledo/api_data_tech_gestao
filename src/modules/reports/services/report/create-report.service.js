import AppDataSource from '../../../../shared/infra/environments/environments.js';  // Importa a conexão do banco
import Report from '../../../../entities/report-cab.entities.js';
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

    async execute({ nome, type }) {


        // Criar o novo relatorio
        const report = this.reportRepository.create({
            nome, type
        });


        // Salvar no banco
        const reportCreate = await this.reportRepository.save(report);


        return report;2

    }

}

export default CreateReportService;
