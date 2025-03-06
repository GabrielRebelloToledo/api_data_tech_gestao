import { EntitySchema } from 'typeorm';


export class Department {
  constructor(id,department) {
    this.id = id;
    this.department = department;
     
  }
}

export default new EntitySchema({
  name: 'Department',
  target: Department,

  columns: {
    id: {
      primary: true,
      type: 'int',
      generated:true
    },
    department: {
      type: 'varchar'
    }
  }
});