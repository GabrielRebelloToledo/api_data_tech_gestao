import AppDataSource from '../../../../shared/infra/environments/environments.js';  // Importa a conexão do banco
import AppError from '../../../../shared/errors/app-error.js'; // Classe personalizada de erro
import Called from '../../../../entities/called.entities.js';  // Sua entidade de usuário
import AppErrorTypes from '../../../../shared/errors/app-error-types.js';
import { NOT_FOUND } from '../../../../shared/infra/constants/http-status-code.constants.js';
 

class ListCompaniesService {
    constructor() {
        // Repositório do TypeORM para a entidade Called
        this.companieCalled = AppDataSource.getRepository(Called);
    }

    async executePendente(userId, userType, departmentId, companyId) {

        const calleds = await this.companieCalled
            .createQueryBuilder("c")
            .select([
                "c.id as id_number", // Todos os campos da tabela called
                "c.*",
                "cs.*", // Todos os campos da tabela companie (Secundária)
                "us.id", // Todos os campos da tabela user
                "us.name as user_name",
                "s.*", // Todos os campos da tabela situation
                "cd.*", // Todos os campos da tabela comp_dep
                "cdu.*" // Todos os campos da tabela comp_dep_users
            ])
            .innerJoin("companie", "cp", "c.companieIdP = cp.id")
            .innerJoin("companie", "cs", "c.companieIdS = cs.id")
            .innerJoin("user", "us", "c.userId = us.id")
            .innerJoin("situation", "s", "c.status = s.id")
            .innerJoin("comp_dep", "cd", "c.companieIdP = cd.companieId AND c.idDepCall = cd.departmentId")
            .innerJoin("comp_dep_users", "cdu", "cd.idDepartComp = cdu.idDepartComp")
            .where("cdu.userId = :userId AND c.status in ('P', 'A') AND c.userIdResp is null", { userId: userId })
            .getRawMany();

        if (calleds) {
            console.error(AppErrorTypes.users.notFound, NOT_FOUND);
        }

        return calleds;
    }

    async executeMe(userId, userType, departmentId, companyId) {

        const calleds = await this.companieCalled
            .createQueryBuilder("c")
            .select([
                "c.id as id_number", // Todos os campos da tabela called
                "c.*",
                "cp.*", // Todos os campos da tabela companie (Primária)
                "cs.*", // Todos os campos da tabela companie (Secundária)
                "us.id", // Todos os campos da tabela user
                "us.name as user_name",
                "s.*"// Todos os campos da tabela situation
            ])
            .innerJoin("companie", "cp", "c.companieIdP = cp.id")
            .innerJoin("companie", "cs", "c.companieIdS = cs.id")
            .innerJoin("user", "us", "c.userId = us.id")
            .innerJoin("situation", "s", "c.status = s.id")
            .where("c.userId = :userId AND c.status in ('P', 'A')", { userId: userId })
            .getRawMany();

        if (calleds) {
            console.error(AppErrorTypes.users.notFound, NOT_FOUND);
        }

        return calleds;
    }


    async executeResponsible(userId, userType, departmentId, companyId) {

        const calleds = await this.companieCalled.find({
            where: { userIdResp: userId },
            relations: ['primaryCompanie', 'user', 'statusId']
        });


        if (calleds) {
            console.error(AppErrorTypes.users.notFound, NOT_FOUND);
        }

        return calleds;
    }

    async executeAll(userId, userType, departmentId, companyId) {

        const calleds = await this.companieCalled.find({
            where: { companieIdP: companyId, user: { department: departmentId } },
            relations: ['primaryCompanie', 'user', 'statusId']
        });


        if (calleds) {
            console.error(AppErrorTypes.users.notFound, NOT_FOUND);
        }

        return calleds;
    }


}

export default ListCompaniesService;
