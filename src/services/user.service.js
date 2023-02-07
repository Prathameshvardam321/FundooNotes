import User from '../models/user.model';
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import logger, { logStream } from '../config/logger';
import { checkEmail } from '../utils/user.util';
import { sendEmail } from '../utils/email';
import e from 'express';
//get all users
export const getAllUsers = async () => {
  const data = await User.find();
  return data;
};


export const register = async (body) => {
  try {
    const { FirstName, LastName, Email, Password } = body
    const data = await User.findOne({ Email })
    // const token = await jwt.sign({Email},process.env.SECRET_KEY)
    //   logger.info(token)
    return checkEmail(body, data)
  } catch (error) {
    logger.error(error);
  }
}

export const login = async (body) => {
  const { Email, Password } = body
  const data = await User.findOne({ Email })
  console.log("Data---------->>>", data);
  const result = await bcrypt.compare(Password, data.Password)

  if (data) {
    if (result) {
      const token = await jwt.sign({ Id: data._id, Email: data.Email }, process.env.SECRET_KEY)
      return token;
    } else {
      throw new Error('Wrong credentials')
    }
  } else {
    throw new Error("Details not found")
  }
}

export const forgetPassword = async (body) => {
  const user = await User.findOne({ Email: body.Email })
  if (!user) {
    throw new Error('Email not exists!')
  }
  const token = jwt.sign({ Email: user.Email }, process.env.SECRET_KEY_PASSWORD)
  const data = await sendEmail(user.Email, token)
}


export const resetPassword = async (body) => {
  const hashedPassword = await bcrypt.hash(body.Password, 10)
  const data = await User.findOneAndUpdate({ Email: body.Email }, {
    Password: hashedPassword
  }, { new: true })
  return data
}

