import { EntitySchema } from 'typeorm';


export class CompDepUsers {
    constructor(id, department) {
        this.id = id;
        this.department = department;

    }
}

export default new EntitySchema({
    name: 'CompDepUsers',
    target: CompDepUsers,

    columns: {
        idDepCompUser: {
            primary: true,
            type: 'int',
            generated: true
        },
        idDepartComp: {
            type: 'int',
        },
        userId: {
            type: 'int',
        },
    },
    relations: {
        compdep: {
            type: 'many-to-one',
            target: 'CompDep',
            joinColumn: { name: 'idDepartComp' },
        },
        user: {
            type: 'many-to-one',
            target: 'User',
            joinColumn: { name: 'userId' },
        },
    }
});