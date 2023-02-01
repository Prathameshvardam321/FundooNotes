import HttpStatus from 'http-status-codes';
import jwt from 'jsonwebtoken';
import User from '../models/user.model'
export let user
export let user1
export const userAuth = async (req, res, next) => {
  try {
    let bearerToken = req.header('authorization');

    if (!bearerToken)
      throw {
        code: HttpStatus.BAD_REQUEST,
        message: 'Authorization token is required'
      };
    bearerToken = bearerToken.split(' ')[1];
    user = await jwt.verify(bearerToken, process.env.SECRET_KEY);
    console.log(user.Email);
    user1 = await User.findOne({ Email: user.Email })
    req.body.UserId = user1._id
    console.log(req.body.UserId);
  
    next();
  } catch (error) {
    next(error);
  }
};

