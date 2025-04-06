import { container } from 'tsyringe';
import { BAD_REQUEST, NO_CONTENT } from '../../../shared/infra/constants/http-status-code.constants.js';

import CreateDepCompanieUsersService from '../services/companies-departments-users/create-dep-comp-user.service.js';
import DeleteDepCompaniesUsersService from '../services/companies-departments-users/delete-dep-comp-user.service.js';

//import UpdateDepCompaniesService from '../services/companies-departments/update-dep-comp.service.js';
//import ShowDepCompaniesService from '../services/companies-departments/show-dep-comp.service.js';
import ListdepCompaniesUsersService from '../services/companies-departments-users/list-dep-comp-user.service.js';
import ListDepOpenCallService from '../services/companies-departments-users/list-dep-open-called.service.js';
class CompaniesDepartUserController {
  async create(request, response) {

    /* console.log(request.body); */

    const { idDepartComp, userId } = request.body;

    const createCompanieService = container.resolve(CreateDepCompanieUsersService);

    const companie = await createCompanieService.execute({ idDepartComp, userId });

    if (companie && companie.success === false) {
      return response.status(BAD_REQUEST).json({ message: companie.message });
    }

    return response.json(companie);
  }

  /*   async show(request, response) {
  
      const { id } = request.params;
  
      console.log(id)
  
      const showCompanieService = container.resolve(ShowDepCompaniesService);
  
      const user = await showCompanieService.execute(id);
  
      return response.json(user);
    } */

  async list(request, response) {

    const { id } = request.params;

    const listCompanieService = container.resolve(ListdepCompaniesUsersService);
    const companie = await listCompanieService.execute(id);
    return response.json(companie);
  }


  async listCalledDeps(request, response) {

    const { id } = request.params;

    const listCompanieService = container.resolve(ListDepOpenCallService);
    const companie = await listCompanieService.execute(id);
    return response.json(companie);
  }



  /*    async update(request, response) {
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
    } */


  async delete(request, response) {

    const { id } = request.params;
    const deleteCompanieService = container.resolve(DeleteDepCompaniesUsersService);

    await deleteCompanieService.execute(id);

    return response.status(NO_CONTENT).json();
  }
}

export default new CompaniesDepartUserController();

