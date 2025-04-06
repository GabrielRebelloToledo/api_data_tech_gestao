import { EntitySchema } from 'typeorm';


export class User {
  constructor(id, name, email, password, type) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.password = password;
    this.type = type;
  }
}

export default new EntitySchema({
  name: 'User',
  target: User,

  columns: {
    id: {
      primary: true,
      type: 'int',
      generated: true
    },
    name: {
      type: 'varchar',
    },
    email: {
      type: 'varchar',
      unique: true,
    },
    password: {
      type: 'varchar',
    },
    type: {
      type: 'varchar',
    },
    department: {
      type: 'int',
      nullable: true,
    },
    telephone: {
      type: 'varchar',
      nullable: true,
    },
    active: {
      type: 'varchar',
      default: "S"
    }
  },
  relations: {
    departmentUser: {
      type: 'many-to-one',
      target: 'Department',
      nullable: true,  
      joinColumn: { name: 'department' }
    },
  }
});