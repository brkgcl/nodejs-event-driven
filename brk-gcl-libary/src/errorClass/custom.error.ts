import MainError from './base.error';

/**
 *
 */
export interface ErrorI {
  type: string;
  code: string;
  statusCode: number;
  message: string;
}

class AplicationError extends MainError {
  constructor(payload: ErrorI) {
    super(payload.type, payload.code, payload.statusCode, payload.message);
  }
}

class DatabaseConnectionError extends MainError {
  constructor() {
    super('server', 'DATABASE_CONNECTİON', 400, 'database connection failed');
  }
}

class NotAuthorizedError extends MainError {
  constructor() {
    super('server', 'NOT_AUTHORİZED', 400, 'database connection failed');
  }
}

class InternalServerError extends MainError {
  constructor() {
    super('server', 'INTERNAL_SERVER_ERROR', 500, 'database connection failed');
  }
}

class RequestValidationsError extends MainError {}

export default AplicationError;
