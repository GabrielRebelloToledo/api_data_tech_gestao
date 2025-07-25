import { container } from 'tsyringe';
import { BAD_REQUEST, NO_CONTENT, OK } from '../../../../shared/infra/constants/http-status-code.constants.js';

import CreateReportService from '../../services/report/create-report.service.js';
import DeleteReportService from '../../services/report/delete-report.service.js ';
import UpdateReportService from '../../services/report/update-report.service.js';
import ShowReportmentService from '../../services/report/show-report.service.js';
import ListReportService from '../../services/report/list-report.service.js';
import getParamentrosRelatorioService from '../../services/report/getParamentrosRelatorioService.service.js';
import geraRelatorioService from '../../services/report/geraRelatorioService.service.js';

class ReportController {
  async create(request, response) {

    /* console.log(request.body); */

    const { nome, type } = request.body;
    const createReportService = container.resolve(CreateReportService);
    const report = await createReportService.execute({ nome, type });
    if (report && report.success === false) {
      return response.status(BAD_REQUEST).json({ message: report.message });
    }
    return response.status(OK).json(report);
  }

  async show(request, response) {

    console.log("Cheguei aq")

    const { id } = request.params;

    const showReportService = container.resolve(ShowReportmentService);

    const report = await showReportService.execute(id);

    return response.json(report);
  }

  async list(request, response) {
    const listReportService = container.resolve(ListReportService);
    const report = await listReportService.execute();
    return response.json(report);
  }


  async update(request, response) {

    console.log("Cheguei no update")
    const { id } = request.params;
    const { nome, type } = request.body;

    const updateReportService = container.resolve(UpdateReportService);

    const report = await updateReportService.execute({
      id,
      nome, type
    });

    if (report && report.success === false) {
      return response.status(BAD_REQUEST).json({ message: report.message });
    }

    return response.json(report);
  }


  async delete(request, response) {

    const { id } = request.params;
    const deleteCompanieService = container.resolve(DeleteDepartmentService);

    await deleteCompanieService.execute(id);

    return response.status(NO_CONTENT).json();
  }


  async getParams(request, response) {

    console.log("Aqui to eu")
    console.log(request.params)

    const { id } = request.params;

    const pegaParamentros = container.resolve(getParamentrosRelatorioService);
    const report = await pegaParamentros.execute(id);

    return response.json(report);

  }

  async getRelatorio(request, response) {

    console.log("Chegamos no gerar")
    const { id } = request.params;

    const gerarRelatorio = container.resolve(geraRelatorioService);

    const { nomeRelatorio, tipoRelatorio, blob } = await gerarRelatorio.execute(request.body, id); // Blob

    const buffer = Buffer.from(await blob.arrayBuffer());

    const formato = (request.body.formato || '').toLowerCase();

    const mimeMap = {
      pdf: 'application/pdf',
      xlsx: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      xls: 'application/vnd.ms-excel',
      csv: 'text/csv',
      docx: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      txt: 'text/plain'
    };

    // Se blob existir, usa blob.type, se não usa o padrão
    const mime = mimeMap[tipoRelatorio] || (blob && blob.type) || 'application/octet-stream';
    const extensao = tipoRelatorio || 'bin';

    const nomeArquivo = `${nomeRelatorio.replace('.jrxml', '')}.${extensao}`;

    response.setHeader('Content-Type', mime);
    response.setHeader('Content-Disposition', `attachment; filename="${nomeArquivo}"`);

    return response.send(buffer); 
  }
}

export default new ReportController();

