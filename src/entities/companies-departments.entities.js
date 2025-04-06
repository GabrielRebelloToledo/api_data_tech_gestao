import { EntitySchema } from 'typeorm';


export class CompDep {
    constructor(idDepartComp, departmentId, companieId) {
        this.idDepartComp = idDepartComp;
        this.departmentId = departmentId;
        this.companieId = companieId;

    }
}

export default new EntitySchema({
    name: 'CompDep',
    target: CompDep,

    columns: {
        idDepartComp: {
            primary: true,
            type: 'int',
            generated: true
        },
        departmentId: {
            type: 'int',
        },
        companieId: {
            type: 'int',
        },
        active: {
           type: 'varchar',
           default: "S"
        },
    },
    relations: {
        department: {
            type: 'many-to-one',
            target: 'Department',
            joinColumn: { name: 'departmentId' },
            onDelete: 'CASCADE',
        },
        companie: {
            type: 'many-to-one',
            target: 'Companie',
            joinColumn: { name: 'companieId' },
            onDelete: 'CASCADE',
        },
    }
});





/* 
SELECT * FROM 
called c 
INNER JOIN companie cp ON c.companieIdP = cp.id 
INNER JOIN companie cs ON c.companieIdS = cs.id
INNER JOIN user us ON c.userId = us.id
INNER JOIN situation s ON c.status = s.statusId

INNER JOIN comp_dep cd ON c.companieIdP = cd.companieId AND c.idDepCall = cd.departmentId
INNER JOIN comp_dep_users cdu ON cd.idDepartComp = cdu.idDepartComp


*/


/* 
SELECT * FROM 
called c 
INNER JOIN companie cp ON c.companieIdP = cp.id 
INNER JOIN companie cs ON c.companieIdS = cs.id
INNER JOIN user us ON c.userId = us.id
INNER JOIN situation s ON c.status = s.statusId

INNER JOIN comp_dep cd ON c.companieIdP = cd.companieId AND c.idDepCall = cd.departmentId
INNER JOIN comp_dep_users cdu ON cd.idDepartComp = cdu.idDepartComp

WHERE cdu.userId = 3
*/