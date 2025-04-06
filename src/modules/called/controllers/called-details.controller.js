import { container } from 'tsyringe';
import { BAD_REQUEST, NO_CONTENT } from '../../../shared/infra/constants/http-status-code.constants.js';

import CreateCalledService from '../services/called-detais/create-called-details.service.js';
import ListCalledDetailsService from '../services/called-detais/list-called-details.service.js';





class CalledController {

 async create(request, response) {

        /* console.log(request.body); */

        const { calledId, detail, file1, file2, file3, file4, status } = request.body;

        const createCalledService = container.resolve(CreateCalledService);

        const called = await createCalledService.execute({ calledId, status, detail, file1, file2, file3, file4, status });

        if (called && called.success === false) {
            return response.status(BAD_REQUEST).json({ message: called.message });
        }

        return response.json(called);
    }

    async list(request, response) {
    const { id } = request.params;
    const listCalledPendentService = container.resolve(ListCalledDetailsService);
    const called = await listCalledPendentService.execute(id);
    return response.json(called);
  }


    /* async update(request, response) {
     const { id } = request.params;
     const { userId } = request.body;
 
 
     console.log(request.params, request.body)
      const updateCallService = container.resolve(UpdateCallService);
 
     const call = await updateCallService.execute({
       id,
       userId
     });
     
     if(call && call.success === false){
       return response.status(BAD_REQUEST).json({ message: call.message });
     }
 
     return response.json(call); 
   }  */

}

export default new CalledController();

