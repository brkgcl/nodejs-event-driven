/**
 *
 */

class MainError extends Error {
  public type: string;
  public code: string;
  public statusCode: number;
  public message: string;

  constructor(type: string, code: string, statusCode: number, message: string) {
    super(message);
    this.type = type;
    this.code = code;
    this.statusCode = statusCode;
    this.message = message;
  }
}

export default MainError;
