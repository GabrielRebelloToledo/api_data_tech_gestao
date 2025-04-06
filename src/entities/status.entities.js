import { EntitySchema } from 'typeorm';


export class Status {
    constructor(id, status, color,colorText) {
        this.id = id;
        this.status = status;
        this.color = color;
        this.colorText = colorText;
    }
}

export default new EntitySchema({
    name: 'Status',
    target: Status,

    columns: {
        id: {
            primary: true,
            type: 'int',
            generated: true
        },
        status: {
            type: 'varchar',
        },
        close: {
            type: 'varchar',
        }
    }
});
