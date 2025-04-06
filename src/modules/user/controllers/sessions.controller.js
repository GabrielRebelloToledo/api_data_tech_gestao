import { container } from 'tsyringe';
import AuthenticateUsersService from '../services/authenticate-users.service.js';
import CreateUsersService from '../services/users/create-user.service.js';
import DeleteUsersService from '../services/users/delete-user.service.js'
import ListUsersService from '../services/users/list-user.service.js'
import ShowUsersService from '../services/users/show-user.service.js'
import UpdateUsersService from '../services/users/update-user.service.js'
import { UNAUTHORIZED } from '../../../shared/infra/constants/http-status-code.constants.js';


class SessionsController {
  async signIn(request, response) {

    
    /* console.log(request.body) */

    const { email, password } = request.body;

    const authenticateUsersService = container.resolve( AuthenticateUsersService);

    const token = await authenticateUsersService.execute({
      email,
      password,
    });

    if(token && token.success === false){
      return response.status(UNAUTHORIZED).json({ message: token.message });
    } 
   /*  console.log(token) */
    return response.json(token);

  }


  async create(request, response) {

    const { name, email, password, type, active,telephone,department } = request.body;

    const createUsersService = container.resolve(CreateUsersService);

    const user =  await createUsersService.execute({ name, email, password, type, active,telephone,department });

    if(user && user.success === false){
      return response.status(BAD_REQUEST).json({ message: user.message });
    }

    return response.json(user);
  }
  async show(request, response) {

    const { id } = request.params;

    

    const showUsersService = container.resolve(ShowUsersService);

    const user = await showUsersService.execute(id);

    return response.json(user);
  }

  async list(request, response) {
    const showUsersService = container.resolve(ListUsersService);
    const user = await showUsersService.execute();
    return response.json(user);
  }




   async update(request, response) {
    
    const { id } = request.params;
    const { name, email, password, type, active,telephone,department  } = request.body;

    const updateUsersService = container.resolve(UpdateUsersService);

    const user = await updateUsersService.execute({
      id,
      name, 
      email, 
      password, 
      type,
      active,
      telephone, 
      department
    });
    
    if(user && user.success === false){
      return response.status(BAD_REQUEST).json({ message: user.message });
    }

    return response.json(user);
  }


   async delete(request, response) {

    const { id } = request.params;
    const deleteUsersService = container.resolve(DeleteUsersService);

    await deleteUsersService.execute(id);

   }
}

export default new SessionsController();

