import { container } from 'tsyringe';
import { BAD_REQUEST, OK } from '../../../shared/infra/constants/http-status-code.constants.js';

import CreateEmailService from '../service/email.service.js';


class EmailController {
  async create(request, response) {


    const { name , email , mensagem } = request.body;

    const createEmailService = container.resolve(CreateEmailService);

    const emails =  await createEmailService.execute({ name , email , mensagem });


    if(emails && emails.success === false){
      return response.status(BAD_REQUEST).json({ message: emails.message });
    }

    return response.status(OK).json({ message: emails.message });
  }

}

export default new EmailController();

