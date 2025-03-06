import { container } from 'tsyringe';
import { BAD_REQUEST, NO_CONTENT } from '../../../shared/infra/constants/http-status-code.constants.js';

import CreateUsersCompanieService from '../services/companies/create-users-companie.service.js';
import ShowUsersCompanieService from '../services/companies/show-companie-users.service.js';
import DeleteUsersCompanieService from '../services/companies/delete-users-companie.service.js';
import UpdateUsersService from '../services/companies/update-users-companie.service.js';
import ListUsersService from '../services/companies/list-users-companie.service.js';

class UsersCompanieController {
  async create(request, response) {
    
     console.log(request.body); 

    const { userId, companieId} = request.body;

    const createUsersCompanieService = container.resolve(CreateUsersCompanieService);

    const userCompanie =  await createUsersCompanieService.execute({ userId, companieId });

    if(userCompanie && userCompanie.success === false){
      return response.status(BAD_REQUEST).json({ message: user.message });
    }

    return response.status(NO_CONTENT).json();
  }

  async show(request, response) {

    const { id } = request.params;

    const showUsersCompanieService = container.resolve(ShowUsersCompanieService);

    const user = await showUsersCompanieService.execute(id);

    return response.json(user);
  }

  async list(request, response) {
    const showUsersService = container.resolve(ListUsersService);
    const user = await showUsersService.execute();
    return response.json(user);
  }


   async update(request, response) {
    const { id } = request.params;
    const { name, email, password } = request.body;

    const updateUsersService = container.resolve(UpdateUsersService);

    const user = await updateUsersService.execute({
      id,
      name,
      email,
      password
    });
    
    if(user && user.success === false){
      return response.status(BAD_REQUEST).json({ message: user.message });
    }

    return response.json(user);
  }


   async delete(request, response) {

    const { id } = request.params;
    const deleteUsersService = container.resolve(DeleteUsersCompanieService);

    await deleteUsersService.execute(id);

    return response.status(NO_CONTENT).json();
  }
}

export default new UsersCompanieController();

