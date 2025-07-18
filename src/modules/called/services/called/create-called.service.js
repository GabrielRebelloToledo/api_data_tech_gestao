import AppDataSource from '../../../../shared/infra/environments/environments.js';  // Importa a conexão do banco
import AppErrorTypes from '../../../../shared/errors/app-error-types.js';
import AppError from '../../../../shared/errors/app-error.js'; // Classe personalizada de erro
import { CONFLICT } from '../../../../shared/infra/constants/http-status-code.constants.js';
import { Called } from '../../../../entities/called.entities.js';
import ShowCompaniesService from './show-called.service.js';

import CreateEmailService from '../../../email/service/email.service.js';

import { container } from 'tsyringe';


class CreateCalledService {
  constructor() {
    // Repositório do TypeORM para a entidade
    this.companieCalled = AppDataSource.getRepository(Called);
  }

  async execute({ userId, companieIdP, idDepCall, telephone, anydesk, reason, file1, file2, file3, file4, status, emailscopy }) {


    // Criar o novo chamado
    const called = this.companieCalled.create({
      userId, companieIdP, idDepCall, telephone, anydesk, reason, file1, file2, file3, file4, status, emailscopy
    });

    // Salvar no banco
    const calledCreate = await this.companieCalled.save(called);


    console.log(calledCreate.id);

    const idCalled = calledCreate.id;

    await this.criarEmail(idCalled);


    /* if (calledCreate.id) {
      await this.criarEmail(calledCreate.id);
    } */
    // Retornar a empresa cadastrada
    return calledCreate;
  }



  async criarEmail(id) {

    const showCalled = container.resolve(ShowCompaniesService);

    const createEmailService = container.resolve(CreateEmailService);

    const getCalled = await showCalled.getInfosEmailInicial(id);

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
    const dataFechamento = getCalled[0].dataFinish;

    const emailsEnvio = emailUserAbert + ", " + emails + ", " + emailsCopia;


    console.log(emailsEnvio);


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
    <h3>Chamado Nro. ${nro} - Aberto Com Sucesso!</h3>
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
      <h3>Anexos</h3>
      <p>${anexo1}</p>
      <p>${anexo2}</p>
      <p>${anexo3}</p>
      <p>${anexo4}</p>
    </div>

    <div>
      <h3>Datas</h3>
      <p>Abertura: ${dataAbertura}</p>
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

   await createEmailService.execute(emailsEnvio, mensagem, 'Novo Chamado - DATATECH SISTEMAS!');

  }
}

export default CreateCalledService;
