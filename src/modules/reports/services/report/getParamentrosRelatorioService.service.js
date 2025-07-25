import { container } from 'tsyringe';
import {
    FORBIDDEN,
    UNAUTHORIZED,
} from '../../../../shared/infra/constants/http-status-code.constants.js';

import AppError from '../../../../shared/errors/app-error.js'; // Classe personalizada de erro


import ShowReportServiceFiles from '../report-files/show-report-file.service.js';


class getParamentrosRelatorioService {
    constructor() { }

    async execute(codRelatorio) {

        var nomeRelatorio = "";

        try {
            const pegarRelatorioMestre = container.resolve(ShowReportServiceFiles);
            const relatorio = await pegarRelatorioMestre.getFileMestre(codRelatorio);

            /* console.log(relatorio[0]['arquivo']) */

            nomeRelatorio = relatorio[0].arquivo;


        } catch (error) {
            console.error(error)
        }

        console.log(codRelatorio, nomeRelatorio)

        if (nomeRelatorio == null) return new AppError('Erro ao buscar parâmetros do relatório', 500);;

        const url = `https://relatorios.datatechsistemas.com.br/api/relatorios/get-parametros/${nomeRelatorio}/${codRelatorio}`;

        try {
            const response = await fetch(url);

            if (!response.ok) {
                throw new Error(`Erro ao buscar parâmetros: ${response.statusText}`);
            }


            const parametros = await response.json();
            console.log(parametros)
            return parametros;

        } catch (error) {
            console.error('Erro na chamada da API:', error);
            throw new AppError('Erro ao buscar parâmetros do relatório', 500);
        }


    }


}

export default getParamentrosRelatorioService;
