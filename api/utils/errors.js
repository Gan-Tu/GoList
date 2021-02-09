/**
 * Helpers for passing errors in ExpressJs, and unify error return response
 */

class InternalError extends Error {
  constructor(message) {
    super();
    this.message = message;
    this.statusCode = 500;
  }
}
class BadRequestError extends InternalError {
  constructor(message) {
    super(message);
    this.statusCode = 400;
  }
}

class NotFoundError extends InternalError {
  constructor(message) {
    super(message);
    this.statusCode = 404;
  }
}

module.exports = {
  InternalError,
  BadRequestError,
  NotFoundError,
};
