const CustomError = require('../helpers/customError');
const {verifyToken} = require('../helpers/jwt');

const authHandler = (req, res, next) => {
  try {
    const {access_token} = req.headers;
    if (!access_token) throw new CustomError('Unauthorized', 'Unauthorized', 401);

    const decodedToken = verifyToken(access_token);

    if(!decodedToken) throw new CustomError('Unauthorized', 'Unauthorized', 401);

    req.user = {id: decodedToken.id};
    next();
  } catch (e) {
    next(e);
  }
}

module.exports = authHandler;