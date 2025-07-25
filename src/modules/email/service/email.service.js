
import AppErrorTypes from '../../../shared/errors/app-error-types.js';
import AppError from '../../../shared/errors/app-error.js'; // Classe personalizada de erro
import { CONFLICT } from '../../../shared/infra/constants/http-status-code.constants.js';
import nodemailer from 'nodemailer';
import 'dotenv/config';

class CreateEmailService {
  constructor() { }

  async execute(email, mensagem, assunto ) {
    console.log("Emails a serem enviados")
    console.log(email)

    try {
      const transporter = nodemailer.createTransport({
        host: 'smtp.hostinger.com',
        port: 465,
        secure: true,
        auth: {
          user: process.env.EMAILUSER,
          pass: process.env.EMAILPASS,
        }
      });

      const mailOptions = {
        from: 'contato@datatechsistemas.com.br',
        to: email,
        subject: assunto,
        html: mensagem
      };

      const info = await transporter.sendMail(mailOptions);

      //console.log('Email enviado principal:', info.response);
      //this.enviarEmaildeAviso(email, name);
      return { success: true, message: info.response };
    } catch (error) {
      console.error('Erro ao enviar email:', error);
      return { success: false, message: error.message };
    }

  }

}

export default CreateEmailService;
