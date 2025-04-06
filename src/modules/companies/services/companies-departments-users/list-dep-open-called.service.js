import AppDataSource from '../../../../shared/infra/environments/environments.js';  // Importa a conexão do banco
import AppError from '../../../../shared/errors/app-error.js'; // Classe personalizada de erro
import CompDep from '../../../../entities/companies-departments.entities.js'; // Sua entidade de usuário
import Department from '../../../../entities/departments.entities.js';
import UserCompanie from '../../../../entities/user-companie.entities.js';

import AppErrorTypes from '../../../../shared/errors/app-error-types.js';
import { NOT_FOUND } from '../../../../shared/infra/constants/http-status-code.constants.js';

class ListDepOpenCallService {
    constructor() {
        // Repositório do TypeORM para a entidade User
        this.userCompanieRepository = AppDataSource.getRepository(UserCompanie);
        this.compdepRepository = AppDataSource.getRepository(CompDep);
    }

    async execute(userId) {
        console.log(userId)


        const CompaniesUser = await this.userCompanieRepository
            .createQueryBuilder("usc")
            .select([
                "d.id as id", // Todos os campos da tabela called
                "d.department as name"
            ])
            .innerJoin("comp_dep", "cd", "usc.companieId  = cd.companieId")
            .innerJoin("department", "d", "cd.departmentId  = d.id")
            .where("usc.userId = :userId AND cd.active = 'S'", { userId: userId })
            .distinct(true)
            .getRawMany();


        /* const queryBuilder = this.userCompanieRepository
            .createQueryBuilder('usc') // Alias 'usc' para a tabela user_companie
            .innerJoinAndSelect(CompDep, 'cd', 'usc.companieId = cd.companieId')
            .innerJoinAndSelect(Department, 'd', 'cd.departmentId = d.id')
            .distinct(true) // Garante que os resultados são distintos
            .select(['d.id', 'd.department']); // Seleciona apenas os campos de interesse
        console.log("Código do usuário")
        console.log(userId)
        const departments = await queryBuilder.getMany();
        console.log("Lista de Departamentos Ativos Empresa do Funcionario")
        console.log(departments) */

        console.log(CompaniesUser);

        if (!CompaniesUser) {
            throw new AppError(AppErrorTypes.users.notFound, NOT_FOUND);
        }
        return CompaniesUser;
    }


}

export default ListDepOpenCallService;
