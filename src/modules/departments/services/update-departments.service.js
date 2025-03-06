import AppDataSource from '../../../shared/infra/environments/environments.js';  // Importa a conexão do banco
import Department from '../../../entities/departments.entities.js';
import AppError from '../../../shared/errors/app-error.js'; // Classe personalizada de erro
import AppErrorTypes from '../../../shared/errors/app-error-types.js';
import { CONFLICT } from '../../../shared/infra/constants/http-status-code.constants.js';
import ShowCompaniesService from './show-departments.service.js';
const show = new ShowCompaniesService();


class UpdateDepartmentService {
  constructor() {
    // Repositório do TypeORM para a entidade companie
    this.companieRepository = AppDataSource.getRepository(Department);
  }

  async execute(companies) {

    const companie = await this.getcompanieById(companies.id);

    console.log("Dados Entrada")
    console.log(companies)
    console.log("------ ----- -------")
    console.log("Dados Saída")
    console.log(companie)


     if (!companie) {
      return {success: false, message: new AppError(AppErrorTypes.companie.notFound, NOT_FOUND)};
    } 

    if (companies.name) {
      console.log("Validando nome:", companie.name);
      this.updateName(companie, companies.name);
    }

    if (companies.email) {
      console.log("Atualizando email para:", companies.email);
      const email = await this.updateEmail(companie, companies.email);
      if (email.success == false) {
        return { success: false, message: new AppError(AppErrorTypes.companie.emailAlreadyInUse, CONFLICT) };
      }
    }

    if (companies.cnpj) {
        console.log("Atualizando CNPJ para:", companies.cnpj);
        const cnpj = await this.updateCNPJ(companie, companies.cnpj);
        if (cnpj.success == false) {
          return { success: false, message: new AppError(AppErrorTypes.companie.cnpjAlreadyInUse, CONFLICT) };
        }
      }

      if (companies.telephone) {
        console.log("Atualizando telefone para:", companies.telephone);
        const telephone = await this.updateTelephone(companie, companies.telephone);
        
         if (telephone.success == false) {
          return { success: false, message: new AppError(AppErrorTypes.companie.emailAlreadyInUse, CONFLICT) };
        }
      }


    // Salva e retorna a empresa atualizada
    return await this.companieRepository.save(companie);
  }

  async updateEmail(companie, email) {
    console.log("Verificando email", email);

    // Verifica se o email passado é o mesmo já cadastrado
    if (companie.email === email) {
        console.log("O email é o mesmo, nenhuma atualização necessária.");
        return { success: true, message: "O email já está cadastrado no usuário." };
    }

    // Verifica se o novo email já está em uso por outro usuário
    const companieWithEmail = await this.companieRepository.findOne({
        where: { email },
    });

    if (companieWithEmail) {
        console.log("Conflito de email detectado");
        return { success: false, message: "Email já está em uso por outro usuário." };
    }

    // Atualiza o email do usuário
    companie.email = email;
    return { success: true, message: "Email atualizado com sucesso." };
}

async updateCNPJ(companie, cnpj) {
    console.log("Verificando CNPJ", cnpj);

    // Verifica se o email passado é o mesmo já cadastrado
    if (companie.cnpj === cnpj) {
        console.log("O cnpj é o mesmo, nenhuma atualização necessária.");
        return { success: true, message: "O cnpj já está cadastrado na empresa." };
    }

    // Verifica se o novo email já está em uso por outro usuário
    const companieWithEmail = await this.companieRepository.findOne({
        where: { cnpj },
    });

    if (companieWithEmail) {
        console.log("Conflito de CNPJ detectado");
        return { success: false, message: "CNPJ já está em uso por outro Empresa." };
    }

    // Atualiza o email do usuário
    companie.cnpj = cnpj;
    return { success: true, message: "CNPJ atualizado com sucesso." };
}

async updateName(companie, name) {
    if (companie.name !== name) {
      companie.name = name;
      return { success: true, message: "Nome atualizado com sucesso." };
    }
  }

  async updateTelephone(companie, telephone) {
    if (companie.telephone !== telephone) {
      companie.telephone = telephone;
      return { success: true, message: "Telefone atualizado com sucesso." };
    }
    return { success: true, message: "Telefone não modificado!" };
  }

  async getcompanieById(id) {
    console.log("Buscando empresa por id:", id);  // Verifique o id usado na consulta
    const companie = await show.execute(id);

    if (!companie) {
      return { success: false, message: new AppError(AppErrorTypes.companie.notFound, NOT_FOUND) };
    }else{
      return companie;
    }    
  }
}

export default UpdateDepartmentService;
