import User from '../models/user.model';
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { checkEmail } from '../utils/user.util';
//get all users
export const getAllUsers = async () => {
  const data = await User.find();
  return data;
};


export const register = async (body) => {
  try {
    const { FirstName, LastName, Email, Password } = body
    const data = await User.findOne({ Email })
    const token = await jwt.sign({Email},process.env.SECRET_KEY)
      console.log(token)
    return checkEmail(body,data)
  } catch (error) {
    console.log(error);
  }
}

export const login = async (body) => {
  const { Email, Password } = body
  const data = await User.findOne({ Email })
  const result = await bcrypt.compare(Password, data.Password)
  if (data) {
    if (result) {
      const token = await jwt.sign({Email},process.env.SECRET_KEY)
      console.log(token);
      return token;
    } else {
      throw new Error('Wrong credentials')
    }
  } else {
    throw new Error("Details not found")
  }
}

//createtoken
export const createToken = async (body) => {
  try {
  const { _id, Email } = body
  if (Email && _id) {
    const token = await jwt.sign({ _id },process.env.SECRET_KEY)
    
    const verify = await jwt.verify(token,process.env.SECRET_KEY)
    
  } else {
    throw Error("Enter ID and Email")
  }
}
catch (error) {
   console.log(error); 
}
}