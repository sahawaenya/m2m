class CustomError extends Error {
  constructor(message, name, status) {
    super(message);
    this.name = name;
    this.status = status
  }
}

module.exports = CustomError;