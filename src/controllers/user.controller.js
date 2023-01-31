import HttpStatus from 'http-status-codes';
import * as UserService from '../services/user.service';


export const getAllUsers = async (req, res, next) => {
  try {
    const data = await UserService.getAllUsers();
    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      data: data,
      message: 'All users fetched successfully'
    });
  } catch (error) {
    next(error);
  }
};



export const register = async (req, res, next) => {
  try {
    const data = await UserService.register(req.body);
    if (req.body.Password === req.body.ConfirmPassword) {

    }
    else {
      throw new Error("Password not matching")
    }
    res.status(HttpStatus.CREATED).json({
      code: HttpStatus.CREATED,
      data: data,
      message: 'User created successfully'
    });
  } catch (error) {
    next(error);
  }
};


export const login = async (req, res, next) => {
  try {
    const data = await UserService.login(req.body);
    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      data: data,
      message: 'validating User'
    });
  } catch (error) {
    console.log(error);
    next(error)
  }
}

export const createToken = async(req,res,next) =>{
  try {
    const data = await UserService.createToken(req.body);
    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      data: data,
      message: 'Generated token'
    });
  } catch (error) {
    console.log(error);
    next(error)
  }
}