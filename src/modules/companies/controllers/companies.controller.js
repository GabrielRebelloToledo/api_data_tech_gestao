import { container } from 'tsyringe';
import { BAD_REQUEST, NO_CONTENT } from '../../../shared/infra/constants/http-status-code.constants.js';

import CreateCompanieService from '../services/create-companies.service.js';
import DeleteCompaniesService from '../services/delete-companies.service.js';
 
import UpdateCompaniesService from '../services/update-companies.service.js';

import ShowCompaniesService from '../services/show-companies.service.js';
import ListCompaniesService from '../services/list-companies.service.js';

class CompaniesController {
  async create(request, response) {

    /* console.log(request.body);
 */
    const { name, cnpj, adress, email, telephone } = request.body;

    const createCompanieService = container.resolve(CreateCompanieService);

    const companie =  await createCompanieService.execute({ name, cnpj, adress, email, telephone });

    if(companie && companie.success === false){
      return response.status(BAD_REQUEST).json({ message: companie.message });
    }

    return response.json(companie);
  }

  async show(request, response) {

    const { id } = request.params;

   /*  console.log(id) */

    const showCompanieService = container.resolve(ShowCompaniesService);

    const user = await showCompanieService.execute(id);

    return response.json(user);
  }

  async list(request, response) {
    const listCompanieService = container.resolve(ListCompaniesService);
    const companie = await listCompanieService.execute();
    return response.json(companie);
  }


   async update(request, response) {
    const { id } = request.params;
    const { name, cnpj, adress, email, telephone } = request.body;

    const updateCompanieService = container.resolve(UpdateCompaniesService);

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
    const deleteCompanieService = container.resolve(DeleteCompaniesService);

    await deleteCompanieService.execute(id);

    return response.status(NO_CONTENT).json();
  }
}

export default new CompaniesController();

