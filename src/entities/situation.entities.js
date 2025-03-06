import { EntitySchema } from 'typeorm';


export class Situation {
  constructor(status, situation) {
    this.status = status;
    this.situation = situation;
     
  }
}

export default new EntitySchema({
  name: 'Situation',
  target: Situation,

  columns: {
    id: {
      primary: true,
      type: 'varchar',
    },
    situation: {
      type: 'varchar'
    }
  }
});