const AppErrorTypes = {
    sessions: {
      invalidCredentials:
        'As credenciais fornecidas são inválidas. Verifique seu e-mail e senha.',
      tokenNotFound:
        'The authentication token was not found. Please log in again.',
      invalidToken:
        'The authentication token is invalid or has expired. Please log in again.',
      insufficientPrivilege:
        'You do not have sufficient privileges to access this resource. Please contact the administrator if you believe this is an error.',
      missingUserFeatureGroup:
        'The user does not have an assigned feature group. Please contact the administrator to resolve this issue.',
    },
    users: {
      emailAlreadyInUse:
        'The provided email is already in use. Please use a different email.',
      notFound: 'The user(s) was not found.',
    },
    companie: {
      companieAlreadyInUse:
        'The companie is already in use. Please use a different CNPJ.',
      notFound: 'The companie(s) was not found.',
      emailAlreadyInUse:
      'The provided email is already in use. Please use a different email.',
      cnpjAlreadyInUse:
      'The provided CNPJ is already in use. Please use a different CNPJ.',
    },
    features: {
      notFound: 'The feature(s) was not found.',
    },
    featureGroups: {
      notFound: 'The feature group(s) was not found.',
      keyAlreadyRegistered:
        'The feature group key is already registered. Please use a unique key.',
      nameAlreadyRegistered:
        'The feature group name is already registered. Please use a unique name.',
    },
  };
  
  export default AppErrorTypes;
  