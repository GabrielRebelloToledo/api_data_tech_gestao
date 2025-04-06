import { container } from 'tsyringe';
import { BAD_REQUEST, NO_CONTENT } from '../../../shared/infra/constants/http-status-code.constants.js';

import CreateDepCompanieService from '../services/companies-departments/create-dep-comp.service.js';
import DeleteDepCompaniesService from '../services/companies-departments/delete-dep-comp.service.js';
 
import UpdateDepCompaniesService from '../services/companies-departments/update-dep-comp.service.js';

import ShowDepCompaniesService from '../services/companies-departments/show-dep-comp.service.js';
import ListdepCompaniesService from '../services/companies-departments/list-dep-comp.service.js';

class CompaniesDepartController {
  async create(request, response) {

    /* console.log(request.body); */

    const { departmentId, companieId } = request.body;

    const createCompanieService = container.resolve(CreateDepCompanieService);

    const companie =  await createCompanieService.execute({ departmentId, companieId });

    if(companie && companie.success === false){
      return response.status(BAD_REQUEST).json({ message: companie.message });
    }

    return response.json(companie);
  }

  async show(request, response) {

    const { id } = request.params;

   /*  console.log(id) */

    const showCompanieService = container.resolve(ShowDepCompaniesService);

    const user = await showCompanieService.execute(id);

    return response.json(user);
  }

  async list(request, response) {

    const { id } = request.params;

    const listCompanieService = container.resolve(ListdepCompaniesService);
    const companie = await listCompanieService.execute(id);
    return response.json(companie);
  }


   async update(request, response) {
    const { id } = request.params;
    const { name, cnpj, adress, email, telephone } = request.body;

    const updateCompanieService = container.resolve(UpdateDepCompaniesService);

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
    const deleteCompanieService = container.resolve(DeleteDepCompaniesService);

    await deleteCompanieService.execute(id);

    return response.status(NO_CONTENT).json();
  }
}

export default new CompaniesDepartController();

