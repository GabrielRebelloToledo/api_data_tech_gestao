import { container } from 'tsyringe';
import { BAD_REQUEST, NO_CONTENT } from '../../../shared/infra/constants/http-status-code.constants.js';

import CreateCalledService from '../services/called/create-called.service.js';
import ListCalledPendentsService from '../services/called/list-called.service.js';
import ShowCallService from '../services/called/show-called.service.js';
import UpdateCallService from '../services/called/update-called.service.js';




class CalledController {
  async create(request, response) {

    console.log(request.body);

    const { userId, companieIdP,  idDepCall, telephone, anydesk, reason, file1, file2, file3, file4, status, emailscopy } = request.body;

    const createCalledService = container.resolve(CreateCalledService);

    const called = await createCalledService.execute({ userId, companieIdP,  idDepCall, telephone, anydesk, reason, file1, file2, file3, file4, status, emailscopy });

    if (called && called.success === false) {
      return response.status(BAD_REQUEST).json({ message: called.message });
    }


    return response.json(called);
  }

  async listm(request, response) {
    /*  console.log("Meus Chamados!")
     console.log(request.params) */
    const { id, type, department, companieId } = request.params;
    const listCalledPendentService = container.resolve(ListCalledPendentsService);
    const called = await listCalledPendentService.executeMe(id, type, department, companieId);
    return response.json(called);
  }

  async listp(request, response) {
    /* console.log("Pendentes!")
    console.log(request.params) */
    const { id, type, department, companieId } = request.params;
    const listCalledPendentService = container.resolve(ListCalledPendentsService);
    const called = await listCalledPendentService.executePendente(id, type, department, companieId);
    return response.json(called);
  }

  async listr(request, response) {
    /* console.log("Resolvidos!") */
    const { id, type, department, companieId } = request.params;
    const listCalledPendentService = container.resolve(ListCalledPendentsService);
    const called = await listCalledPendentService.executeResponsible(id, type, department, companieId);
    return response.json(called);
  }

  async listc(request, response) {
    /* console.log("Completos!") */
    const { id, type, department, companieId } = request.params;
    const listCalledPendentService = container.resolve(ListCalledPendentsService);
    const called = await listCalledPendentService.executeAll(id, type, department, companieId);
    return response.json(called);
  }


  async show(request, response) {

    const { id } = request.params;

    /*    console.log(id) */

    const showCallService = container.resolve(ShowCallService);

    const call = await showCallService.execute(id);

    return response.json(call);
  }




  async update(request, response) {
    const { id } = request.params;
    const { userId } = request.body;


    console.log(request.params, request.body)
    const updateCallService = container.resolve(UpdateCallService);

    const call = await updateCallService.execute({
      id,
      userId
    });

    if (call && call.success === false) {
      return response.status(BAD_REQUEST).json({ message: call.message });
    }

    return response.json(call);
  }

}

export default new CalledController();

