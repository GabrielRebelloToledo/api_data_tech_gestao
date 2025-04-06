import { container } from 'tsyringe';
import { BAD_REQUEST, CREATED } from '../../../shared/infra/constants/http-status-code.constants.js';

import CreateService from '../services/status-create.service.js';
import UpdateService from '../services/status-update.service.js';
import ShowService from '../services/status-show.service.js';
import ListService from '../services/status-list.service.js';
import DeleteService from '../services/status-delete.service.js';
class StatusController {

  async create(request, response) {

    const { status, close } = request.body;

    const createStatus = container.resolve(CreateService);
    const cstatus = await createStatus.execute({ status, close });
    if (cstatus && cstatus.success === false) {
      return response.status(BAD_REQUEST).json({ message: cstatus.message });
    }

    return response.status(CREATED).json();
  }


  async update(request, response) {

    const { id, status, close } = request.body;

    const updateStatus = container.resolve(UpdateService);
    const ustatus = await updateStatus.execute({ id, status, close });
    if (ustatus && ustatus.success === false) {
      return response.status(BAD_REQUEST).json({ message: ustatus.message });
    }

    return response.status(CREATED).json();
  }

  async show(request, response) {
    const showService = container.resolve(ShowService);
    const show = await showService.execute(request.params.statusId);
    /*  console.log(show) */
    return response.json(show);
  }

  async list(request, response) {
    const listStatus = container.resolve(ListService);
    const status = await listStatus.execute();
    return response.json(status);
  }

  async delete(request, response) {


    const id = request.params.id;
    const deleteStatusService = container.resolve(DeleteService);

    const status = await deleteStatusService.execute(id);


    if (status.success) {

      return response.json(status);
    }

    return response.status(400).json({ status });
    // Retorna a resposta corretamente

  }
}

export default new StatusController();

