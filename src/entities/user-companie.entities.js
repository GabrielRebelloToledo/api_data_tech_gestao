import { EntitySchema } from 'typeorm';


export class UserCompanie {
    constructor(idUserCompanie, userId, companieId) {
        this.idUserCompanie = idUserCompanie;
        this.userId = userId;
        this.companieId = companieId;
    }
}

export default new EntitySchema({
    name: 'UserCompanie',
    target: UserCompanie,

    columns: {
        idUserCompanie: {
            primary: true,
            type: 'int',
            generated: true
        },
        userId: {
            type: 'int',
        },
        companieId: {
            type: 'int',
        },
    },

  relations: {
    user: {
        type: 'many-to-one',
        target: 'User',
        joinColumn: { name: 'userId' },
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
