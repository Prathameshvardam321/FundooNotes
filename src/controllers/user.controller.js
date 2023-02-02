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
    next(error)
  }
}

export const forgetPassword = async (req, res, next) => {
  try {
    const data = await UserService.forgetPassword(req.body);
    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      data: data,
      message: ''
    });
  } catch (error) {
    next(error)
  }
}

export const resetPassword = async (req, res, next) => {
  try {
    const data = await UserService.resetPassword(req.body);
    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      data: data,
      message: 'Password reseted successfully'
    });
  } catch (error) {
    next(error)
  }
}


