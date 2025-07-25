import AppDataSource from '../../../../shared/infra/environments/environments.js';  // Importa a conexão do banco
import AppError from '../../../../shared/errors/app-error.js'; // Classe personalizada de erro
import Report from '../../../../entities/report-cab.entities.js';
import ReportFiles from '../../../../entities/report-arquivos.entities.js';
import AppErrorTypes from '../../../../shared/errors/app-error-types.js';
import { NOT_FOUND } from '../../../../shared/infra/constants/http-status-code.constants.js';

class ShowReportServiceFiles {
    constructor() {
        // Repositório do TypeORM para a entidade User
        this.reportRepository = AppDataSource.getRepository(Report);
        this.reportFilesRepository = AppDataSource.getRepository(ReportFiles);
    }

    async execute(id) {
        const report = await this.reportRepository.findOneBy({ id })

        if (!report) {
            /*  throw new AppError(AppErrorTypes.users.notFound, NOT_FOUND); */
            return { success: false, message: new AppError(AppErrorTypes.users.notFound, NOT_FOUND) };
        }
        return report;
    }

    async getFileMestre(id) {
        const report = await this.reportFilesRepository.find({ where: { idCabReport: id, mestre: 1 } })

        if (!report) {
            /*  throw new AppError(AppErrorTypes.users.notFound, NOT_FOUND); */
            return { success: false, message: new AppError(AppErrorTypes.users.notFound, NOT_FOUND) };
        }
        return report;
    }


}

export default ShowReportServiceFiles;
