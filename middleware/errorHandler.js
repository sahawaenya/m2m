const CustomError = require('../helpers/customError');
const {JsonWebTokenError} = require("jsonwebtoken");

const errorHandler = (err, req, res, next) => {
  if (err instanceof CustomError) {
    return res.status(err.status).json({
      message: err.message
    });
  }

  if(err instanceof JsonWebTokenError){
    return res.status(401).json({
      message: err.message
    });
  }

  res.status(500).json({
    message: 'Internal Server Error'
  });
}

module.exports = errorHandler;