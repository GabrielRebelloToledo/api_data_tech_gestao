import { EntitySchema } from 'typeorm';


export class ReportArquivos {
    constructor(id, idCabReport, arquivo, mestre) {
        this.id = id;
        this.idCabReport = idCabReport;
        this.arquivo = arquivo;
        this.mestre = mestre;
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