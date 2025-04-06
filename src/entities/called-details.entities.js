import { EntitySchema } from 'typeorm';


export class CalledDetails {
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
    name: 'CalledDetails',
    target: CalledDetails,

    columns: {
        id: {
            primary: true,
            type: 'int',
            generated: true
        },
        calledId: {
            type: 'int',
        },
        status: {
            type: 'int',
        },
        detail: {
            type: 'text',
        },
        file1:{
            type: 'varchar',
            nullable: true,
        },
        file2:{
            type: 'varchar',
            nullable: true,
        },
        file3:{
            type: 'varchar',
            nullable: true,
        },
        file4:{
            type: 'varchar',
            nullable: true,
        },
        dataResponse: {
            type: 'timestamp',
            default: () => 'CURRENT_TIMESTAMP',
        },

    },
    relations: {
            call: {
                type: 'many-to-one',
                target: 'Called',
                joinColumn: { name: 'calledId' },
                onDelete: 'CASCADE'
            },
            statusId: {
                type: 'many-to-one',
                target: 'Status',
                joinColumn: { name: 'status' },
            }
            
        
    }
});