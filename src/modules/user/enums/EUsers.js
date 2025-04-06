const UserType = {
    ADMIN: 'ADMIN',
    USER: 'USER',
    GERENTE_TI: 'GERENTE_TI'
  };
  
  Object.freeze(UserType); // Impede alterações no objeto para simular um enum
  
  export default UserType;