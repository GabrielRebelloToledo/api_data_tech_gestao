import AppDataSource from '../../../../shared/infra/environments/environments.js';  // Importa a conexão do banco
import AppError from '../../../../shared/errors/app-error.js'; // Classe personalizada de erro
import ReportArquivos from '../../../../entities/report-arquivos.entities.js';
import AppErrorTypes from '../../../../shared/errors/app-error-types.js';
import { NOT_FOUND } from '../../../../shared/infra/constants/http-status-code.constants.js';

class ListReportService {
  constructor() {
    // Repositório do TypeORM para a entidade reportFiles
    this.reportRepository = AppDataSource.getRepository(ReportArquivos);
  }

  async execute(id) {
    const reportFiles = await this.reportRepository.find({ where: { idCabReport: id } });

    if (!reportFiles) {
      throw new AppError(AppErrorTypes.reportFiless.notFound, NOT_FOUND);
    }

    return reportFiles;
  }


}

export default ListReportService;
