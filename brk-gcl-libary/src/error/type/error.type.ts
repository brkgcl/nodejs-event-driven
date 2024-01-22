/**
 *
 */
export const AuthError = {
  EMAIL_ALREADY_EXİTS: {
    name: 'AuthError',
    type: 'INVALID_DATA',
    code: 'BAD_REQUEST',
    statusCode: 400,
    message: 'Invalid username or password',
  },
};

console.log(AuthError.EMAIL_ALREADY_EXİTS);
