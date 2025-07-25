import AppDataSource from '../../../../shared/infra/environments/environments.js';  // Importa a conexão do banco
import { container } from 'tsyringe';
import {
    FORBIDDEN,
    UNAUTHORIZED,
} from '../../../../shared/infra/constants/http-status-code.constants.js';

import AppError from '../../../../shared/errors/app-error.js'; // Classe personalizada de erro
import Department from '../../../../entities/departments.entities.js'; // Sua entidade de usuário
import Report from '../../../../entities/report-cab.entities.js';

import ShowReportServiceFiles from '../report-files/show-report-file.service.js';

class geraRelatorioService {
    constructor() { }

    async execute(data, id) {

        console.log("Entrei no body")
        console.log(data)
        console.log(id)

        var nomeRelatorio = "";
        var tipoRelatorio = "";
        var dados = {};

        try {
            const pegarRelatorioMestre = container.resolve(ShowReportServiceFiles);

            const relatorio = await pegarRelatorioMestre.getFileMestre(id);

            const relatorioType = await pegarRelatorioMestre.execute(id);


            nomeRelatorio = relatorio[0].arquivo;
            tipoRelatorio = relatorioType.type;

            dados = {
                "codRelatorio": id,
                "relatorio": nomeRelatorio,
                "parametros": data,
                "formato": tipoRelatorio
            }

            console.log(dados)

        } catch (error) {
            console.error(error)
        }


        const url = `https://relatorios.datatechsistemas.com.br/api/relatorios/gera-relatorio`;

        try {

            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(dados)
            });

            if (!response.ok) {
                throw new Error(`Erro ao buscar parâmetros: ${response.statusText}`);
            }
            const blob = await response.blob();

            console.log(blob)
            return {
                nomeRelatorio,
                tipoRelatorio,
                blob
            };

        } catch (error) {
            console.error('Erro na chamada da API:', error);
            throw new AppError('Erro ao buscar parâmetros do relatório', 500);
        }
    }


}

export default geraRelatorioService;
