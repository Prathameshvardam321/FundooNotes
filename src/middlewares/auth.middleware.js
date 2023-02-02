import HttpStatus from 'http-status-codes';
import jwt from 'jsonwebtoken';
// export let user
export const userAuth = async (req, res, next) => {
  try {
    let bearerToken = req.header('authorization');
console.log("Req of auth----->",req.body);
    if (!bearerToken)
      throw {
        code: HttpStatus.BAD_REQUEST,
        message: 'Authorization token is required'
      };
    bearerToken = bearerToken.split(' ')[1];
    const user = await jwt.verify(bearerToken, process.env.SECRET_KEY);
    req.body.UserId = user.Id
    next();
  } catch (error) {
    next(error);
  }
};

