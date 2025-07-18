import { EntitySchema } from 'typeorm';


export class ReportArquivos {
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
    name: 'ReportArquivos',
    target: ReportArquivos,

    columns: {
        id: {
            primary: true,
            type: 'int',
            generated: true
        },
        idCabReport: {
            type: 'int'
        },
        arquivo: {
            type: 'text'
        },
        mestre: {
            type: 'bool',
            default: false
        }

    },
    relations: {

        report: {
            type: 'many-to-one',
            target: 'ReportCabecalho',
            joinColumn: { name: 'idCabReport' },
            onDelete: 'CASCADE'
        }
    }
});