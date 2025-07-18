import AppDataSource from '../../../../shared/infra/environments/environments.js';  // Importa a conexão do banco
import ReportArquivos from '../../../../entities/report-arquivos.entities.js';
import AppError from '../../../../shared/errors/app-error.js'; // Classe personalizada de erro
import AppErrorTypes from '../../../../shared/errors/app-error-types.js';
import { CONFLICT } from '../../../../shared/infra/constants/http-status-code.constants.js';
import ShowReportService from './show-report-file.service.js';
const show = new ShowReportService();


class UpdateReportService {
  constructor() {
    // Repositório do TypeORM para a entidade companie
    this.reportRepository = AppDataSource.getRepository(ReportArquivos);
  }

  async execute(report) {


    try {
      const resultado = await this.reportRepository.save(report);
      return { success: true, data: resultado };
    } catch (error) {
      if (error.code === 'ER_SIGNAL_EXCEPTION') {
        // erro lançado pela trigger
        return { success: false, message: error.sqlMessage };
      }

      // outros erros
      console.error("Erro inesperado:", error);
      return { success: false, message: "Erro ao salvar o relatório." };
    }
  }

}


export default UpdateReportService;
