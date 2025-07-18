import { container } from 'tsyringe';
import { BAD_REQUEST, NO_CONTENT, OK } from '../../../../shared/infra/constants/http-status-code.constants.js';

import CreateReportService from '../../services/report-files/create-report-file.service.js';
import DeleteReportService from '../../services/report-files/delete-report-file.service.js';
import UpdateReportService from '../../services/report-files/update-report-file.service.js';
import ShowReportmentService from '../../services/report-files/show-report-file.service.js';
import ListReportService from '../../services/report-files/list-report-file.service.js';
import path from 'path';
import fs from 'fs';
import 'dotenv/config';
import archiver from 'archiver';


class ReportFileController {
  async create(request, response) {
    const idCabReport = request.body.idCabReport;
    const jaexiste = "N";

    if (!idCabReport) {
      return response.status(400).json({ erro: 'idCabReport não informado' });
    }
    const novaPasta = path.join(process.env.CAMINHOFILES + '/relatorios', idCabReport);

    if (!fs.existsSync(novaPasta)) {
      fs.mkdirSync(novaPasta, { recursive: true });
    }
    const originalName = request.file.originalname;
    const novoCaminho = path.join(novaPasta, originalName);

    // Verifica se já existe um arquivo com o mesmo nome
    // Se já existe um arquivo com o mesmo nome, remove o anterior
    if (fs.existsSync(novoCaminho)) {
      fs.unlinkSync(novoCaminho);
      jaexiste = "S";
    }

    fs.renameSync(request.file.path, novoCaminho);


    if (jaexiste === "N") {
      const dados = {
        "idCabReport": idCabReport,
        "arquivo": originalName,
        "mestre": 0,
      }

      console.log(dados)

      const createReportService = container.resolve(CreateReportService);
      const report = await createReportService.execute(dados);

    }

    return response.json({ message: 'Upload realizado com sucesso', path: request.file });
  }

  async show(request, response) {

    const { arquivos } = request.body;
    const { idCabReport } = request.params;

    if (!arquivos || !Array.isArray(arquivos) || arquivos.length === 0) {
      return response.status(400).json({ erro: 'Nenhum arquivo selecionado' });
    }

    const zipName = `relatorio-${Date.now()}.zip`;
    const zipPath = path.join(process.env.CAMINHOFILES, '..', 'temp', zipName);

    // Garante que a pasta temporária exista
    const tempDir = path.join(process.env.CAMINHOFILES, '..', 'temp');
    if (!fs.existsSync(tempDir)) {
      fs.mkdirSync(tempDir, { recursive: true });
    }

    const output = fs.createWriteStream(zipPath);
    const archive = archiver('zip', { zlib: { level: 9 } });
    output.on('close', () => {
      response.download(zipPath, zipName, () => {
        // Exclui o zip depois do download
        fs.unlinkSync(zipPath);
      });
    });

    archive.on('error', err => {
      console.error(err);
      response.status(500).send({ erro: 'Erro ao criar ZIP' });
    });

    archive.pipe(output);

    for (const nomeArquivo of arquivos) {
      const caminhoCompleto = path.join(process.env.CAMINHOFILES, 'relatorios', idCabReport, nomeArquivo);
      if (fs.existsSync(caminhoCompleto)) {
        archive.file(caminhoCompleto, { name: nomeArquivo });
      } else {
        console.warn(`Arquivo não encontrado: ${caminhoCompleto}`);
      }
    }

    archive.finalize();
  }

  async list(request, response) {
    const { id } = request.params;

    const listReportService = container.resolve(ListReportService);
    const report = await listReportService.execute(id);
    return response.json(report);
  }


  async update(request, response) {

    console.log("Cheguei no update")
    const { id, idCabReport, arquivo, mestre } = request.body;

    const updateReportService = container.resolve(UpdateReportService);

    const report = await updateReportService.execute({
      id, idCabReport, arquivo, mestre
    });

    if (report && report.success === false) {
      return response.status(BAD_REQUEST).json({ message: report.message });
    }

    return response.json(report);
  }


  async delete(request, response) {

    const { arquivos } = request.body;

    if (!Array.isArray(arquivos) || arquivos.length === 0) {
      return response.status(400).json({ error: 'Nenhum arquivo informado para exclusão.' });
    }

    const erros = [];

    for (const a of arquivos) {
      const { id, idCabReport, arquivo } = a;

      console.log(id, idCabReport, arquivo)

      if (!id || !idCabReport || !arquivo) {
        erros.push({ id, error: 'Dados incompletos' });
        continue;
      }

      try {
        const caminho = path.join(process.env.CAMINHOFILES, 'relatorios', String(idCabReport), arquivo);

        if (fs.existsSync(caminho)) {
          fs.unlinkSync(caminho);
        }

        const deleteReportFilesService = container.resolve(DeleteReportService);
        await deleteReportFilesService.execute(id, idCabReport);


      } catch (err) {
        erros.push({ id, error: err.message });
      }
    }

    if (erros.length) {
      return response.status(207).json({ message: 'Alguns arquivos não foram excluídos.', erros });
    }

    return response.status(200).json({ message: 'Todos os arquivos e registros deletados com sucesso.' });
  }
}

export default new ReportFileController();

