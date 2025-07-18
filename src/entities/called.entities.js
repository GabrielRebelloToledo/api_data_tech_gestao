import { EntitySchema } from 'typeorm';


export class Called {
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
    name: 'Called',
    target: Called,

    columns: {
        id: {
            primary: true,
            type: 'int',
            generated: true
        },
        userId: {
            type: 'int',
        },
        companieIdP: {
            type: 'int',
        },
        userIdResp: {
            type: 'int',
            nullable: true,
        },
        idDepCall: {
            type: 'int',
        },
        emailscopy: {
            type: 'varchar',
            nullable: true,
        },
        anydesk: {
            type: 'varchar',
        },
        telephone: {
            type: 'varchar',
        },
        reason: {
            type: 'text',
        },
        file1: {
            type: 'varchar',
            nullable: true,
        },
        file2: {
            type: 'varchar',
            nullable: true,
        },
        file3: {
            type: 'varchar',
            nullable: true,
        },
        file4: {
            type: 'varchar',
            nullable: true,
        },
        dataStart: {
            type: 'timestamp',
            default: () => 'CURRENT_TIMESTAMP',
        },
        status: {
            type: 'int',
            default: 0
        },
        dataFinish: {
            type: 'timestamp',
            nullable: true
        },

    },
    relations: {
        user: {
            type: 'many-to-one',
            target: 'User',
            joinColumn: { name: 'userId' },
            onDelete: 'CASCADE',
        },
        userResp: {
            type: 'many-to-one',
            target: 'User',
            joinColumn: { name: 'userIdResp' },
            onDelete: 'CASCADE',
        },
        primaryCompanie: {
            type: 'many-to-one',
            target: 'Companie',
            joinColumn: { name: 'companieIdP' },
            onDelete: 'CASCADE',
        },
        statusId: {
            type: 'many-to-one',
            target: 'Status',
            joinColumn: { name: 'status' },
        },
        department: {
            type: 'many-to-one',
            target: 'Department',
            joinColumn: { name: 'idDepCall' }
        },
    }


});