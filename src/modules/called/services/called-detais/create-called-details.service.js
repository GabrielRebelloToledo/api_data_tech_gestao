import AppDataSource from '../../../../shared/infra/environments/environments.js';  // Importa a conexão do banco
import AppErrorTypes from '../../../../shared/errors/app-error-types.js';
import AppError from '../../../../shared/errors/app-error.js'; // Classe personalizada de erro
import { CONFLICT } from '../../../../shared/infra/constants/http-status-code.constants.js';
import CalledDetails from '../../../../entities/called-details.entities.js';  // Sua entidade de usuário
import { Called } from '../../../../entities/called.entities.js';
import Status from '../../../../entities/status.entities.js';
import CreateEmailService from '../../../email/service/email.service.js';
import { container } from 'tsyringe';
import ShowCalledsDetailsService from './show-called-details.service.js';

class CreateCalledDetailsService {
  constructor() {
    // Repositório do TypeORM para a entidade
    this.CalledDetails = AppDataSource.getRepository(CalledDetails);
    this.calledRepository = AppDataSource.getRepository(Called);
    this.StatusRepository = AppDataSource.getRepository(Status);
  }

  async execute({ calledId, status, detail, file1, file2, file3, file4 }) {


    // Criar o novo chamado
    const called = this.CalledDetails.create({
      calledId,
      status,
      detail,
      file1,
      file2,
      file3,
      file4
    });

    // Salvar no banco
    const calledCreate = await this.CalledDetails.save(called);
    /*  console.log(calledCreate) */

    const idCalled = calledCreate.calledId;
    const idCalledDetails = calledCreate.id;

    console.log(idCalled)
    console.log(idCalledDetails)

    await this.updateStatusCall(status, calledId);

    await this.criarEmail(idCalled, idCalledDetails);

    return calledCreate;
  }


  async updateStatusCall(status, id) {

    const data = new Date();

    const called = await this.calledRepository.findOneBy({ id });

    const showstatus = await this.StatusRepository.findOne({ where: { id: status } });

    // Verificando se o chamado foi encontrado
    if (!called) {
      console.error(`Chamado com id ${id} não encontrado.`);
      return null;  // Retorna null caso não tenha encontrado o chamado
    }


    if (showstatus.close === "S") {
      called.dataFinish = data;
    }
    if (showstatus.close === "N") {
      called.dataFinish = null;
    }

    called.status = status;

    // Salvando a atualização no banco de dados
    await this.calledRepository.save(called);

  }



  async criarEmail(idCalled, idCalledDetails) {

    const showCalled = container.resolve(ShowCalledsDetailsService);

    const createEmailService = container.resolve(CreateEmailService);

    const getCalled = await showCalled.getInfosEmailDetails(idCalled, idCalledDetails);

    const nro = getCalled[0].nro;
    const empresa = getCalled[0].name;
    const telefone = getCalled[0].telephone;
    const codUsu = getCalled[0].userId;
    const emailsCopia = getCalled[0].emailscopy
    const motivo = getCalled[0].reason;
    const dataAbertura = getCalled[0].dataStart;
    const status = getCalled[0].status;
    const emailUserAbert = getCalled[0].email;
    const anexo1 = getCalled[0].file1;
    const anexo2 = getCalled[0].file2;
    const anexo3 = getCalled[0].file3;
    const anexo4 = getCalled[0].file4;
    const emails = getCalled[0].emails_consult;
    const usuarioinfo = getCalled[0].usuario;
    const dataFechamento = getCalled[0].dataFinish ?? '';
    const dataResposta = getCalled[0].dataResposta ?? '';
    const emailsEnvio = emailUserAbert + ", " + emails + ", " + emailsCopia;



    const mensagem = `
    <!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8" />
  <title>Confirmação de Contato - DataTech Sistemas</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      background-color: #f4f4f4;
      margin: 0;
      padding: 0;
    }
    .container {
      background-color: #ffffff;
      max-width: 600px;
      margin: 40px auto;
      padding: 30px;
      border-radius: 8px;
      box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    }
    .logo {
      text-align: center;
      margin-bottom: 30px;
    }
    .logo img {
      max-width: 200px;
    }
    h2 {
      color: #2c3e50;
    }
    p {
      font-size: 16px;
      color: #444;
      line-height: 1.6;
    }
    .footer {
      margin-top: 30px;
      font-size: 13px;
      color: #999;
      text-align: center;
    }
    .highlight {
      font-weight: bold;
      color: #2c3e50;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="logo">
      <img src="https://gestao.datatechsistemas.com.br/logo/logo_gt.png" alt="DataTech Sistemas" />
    </div>

    <h2>Olá,${usuarioinfo}</h2>

    <div style="border-bottom: 1px solid;">
    <h3>Chamado Nro. ${nro}</h3>
  </div>

    <div style="border-bottom: 1px solid;">
       <p>Empresa: ${empresa}</p>
    </div>

    <div style="border-bottom: 1px solid;">
       <p>Status: ${status}</p>
    </div>
   
    <div style="border-bottom: 1px solid;">
    <p>Motivo: ${motivo}</p>
    </div>

    <div style="border-bottom: 1px solid;">
    <div>
      <h3>Anexos da Resposta</h3>
      <p>${anexo1}</p>
      <p>${anexo2}</p>
      <p>${anexo3}</p>
      <p>${anexo4}</p>
    </div>

    <div>
      <h3>Datas</h3>
      <p>Abertura: ${dataAbertura}</p>
      <p>Resposta: ${dataResposta}</p>
      <p>Fechamento: ${dataFechamento}</p>
    </div>

    <div class="footer">
      Obrigado por escolher a <strong>DataTech Sistemas</strong>!<br />
      <a href="https://www.datatechsistemas.com.br">www.datatechsistemas.com.br</a>
    </div>
  </div>
</body>
</html>
    
    `;

    await createEmailService.execute(emailsEnvio, mensagem, `Seu Chamado ${nro} está com novo Status! 🚀🚀🚀`);

  }
}

export default CreateCalledDetailsService;
