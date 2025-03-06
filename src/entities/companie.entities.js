import { EntitySchema } from 'typeorm';


export class Companie {
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
    name: 'Companie',
    target: Companie,

    columns: {
        id: {
            primary: true,
            type: 'int',
            generated: true
        },
        name: {
            type: 'varchar',
        },
        cnpj: {
            type: 'varchar',
        },
        adress: {
            type: 'varchar',
        },
        email: {
            type: 'varchar',
        },
        telephone: {
            type: 'varchar',
        }
    },
    relations: {
        userSalesCompanie: {  
            type: 'one-to-many',
            target: 'UserCompanie',
            inverseSide: 'companie',
        },
    }
});