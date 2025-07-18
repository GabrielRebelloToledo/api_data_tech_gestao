import AppDataSource from '../../../../shared/infra/environments/environments.js';  // Importa a conexão do banco
import Report from '../../../../entities/report-cab.entities.js';
import AppError from '../../../../shared/errors/app-error.js'; // Classe personalizada de erro
import AppErrorTypes from '../../../../shared/errors/app-error-types.js';
import { CONFLICT } from '../../../../shared/infra/constants/http-status-code.constants.js';
import ShowReportService from './show-report.service.js';
const show = new ShowReportService();


class UpdateReportService {
  constructor() {
    // Repositório do TypeORM para a entidade companie
    this.reportRepository = AppDataSource.getRepository(Report);
  }

  async execute(report) {

    const reportOld = await this.getReportById(report.id);

    console.log("Dados Enviados Usuário")
    console.log(report)
    console.log("------ ----- -------")
    console.log("Dados Banco")
    console.log(reportOld)


    if (!reportOld) {
      return { success: false, message: new AppError("Relatório Não Encontrado!", NOT_FOUND) };
    }

    if (report.nome) {
      console.log("Validando nome:", report.nome);
      this.updateName(reportOld, report.nome);
    }

    if (report.type) {
      console.log("Validando tipo:", report.type);
      this.updateType(reportOld, report.type);
    }

    console.log("A ser salvo!")
    console.log(report)

    // Salva e retorna o report atualizado
    return await this.reportRepository.save(reportOld);
  }



  async updateName(oldReport, newName) {
    if (oldReport.nome !== newName) {
      oldReport.nome = newName;
      return { success: true, message: "Nome atualizado com sucesso." };
    }
  }

  async updateType(oldReport, newType) {
    if (oldReport.type !== newType) {
      oldReport.type = newType;
      return { success: true, message: "Tipo atualizado com sucesso." };
    }
  }



  async getReportById(id) {
    console.log("Buscando report por id:", id);  // Verifique o id usado na consulta
    const report = await show.execute(id);

    if (!report) {
      return { success: false, message: new AppError(AppErrorTypes.companie.notFound, NOT_FOUND) };
    } else {
      return report;
    }
  }
}

export default UpdateReportService;
