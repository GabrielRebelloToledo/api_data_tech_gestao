import { EntitySchema } from 'typeorm';


export class ReportCabecalho {
    constructor(id, name, cnpj, adress, email, telephone) {
        this.id = id;
        this.name = name;
        this.cnpj = cnpj;
        this.adress = adress;
        this.email = email;
        this.telephone = telephone;
    }
}

export default new EntitySchema({
    name: 'ReportCabecalho',
    target: ReportCabecalho,

    columns: {
        id: {
            primary: true,
            type: 'int',
            generated: true
        },
        nome: {
            type: 'text'
        },
        type: {
            type: 'varchar'
        }

    },
    relations: {

    }
});