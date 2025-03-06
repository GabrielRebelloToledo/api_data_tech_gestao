import { container } from 'tsyringe';
import { BAD_REQUEST, NO_CONTENT } from '../../../shared/infra/constants/http-status-code.constants.js';

import CreateDepartmentService from '../services/create-departments.service.js';
import DeleteDepartmentService from '../services/delete-departments.service.js';
 
import UpdateDepartmentService from '../services/update-departments.service.js';

import ShowDepartmentService from '../services/show-departments.service.js';
import ListDepartmentService from '../services/list-departments.service.js';

class DepartmentsController {
  async create(request, response) {

    console.log(request.body);

    const { department } = request.body;

    const createCompanieService = container.resolve(CreateDepartmentService);

    const companie =  await createCompanieService.execute({ department });

    if(companie && companie.success === false){
      return response.status(BAD_REQUEST).json({ message: companie.message });
    }

    return response.json(companie);
  }

  async show(request, response) {

    const { id } = request.params;

    console.log(id)

    const showCompanieService = container.resolve(ShowDepartmentService);

    const user = await showCompanieService.execute(id);

    return response.json(user);
  }

  async list(request, response) {
    const listCompanieService = container.resolve(ListDepartmentService);
    const companie = await listCompanieService.execute();
    return response.json(companie);
  }


   async update(request, response) {
    const { id } = request.params;
    const { name, cnpj, adress, email, telephone } = request.body;

    const updateCompanieService = container.resolve(UpdateDepartmentService);

    const companie = await updateCompanieService.execute({
      id,
      name, cnpj, adress, email, telephone 
    });
    
    if(companie && companie.success === false){
      return response.status(BAD_REQUEST).json({ message: companie.message });
    }

    return response.json(companie);
  }


   async delete(request, response) {

    const { id } = request.params;
    const deleteCompanieService = container.resolve(DeleteDepartmentService);

    await deleteCompanieService.execute(id);

    return response.status(NO_CONTENT).json();
  }
}

export default new DepartmentsController();

