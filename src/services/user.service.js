import User from '../models/user.model';
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
//get all users
export const getAllUsers = async () => {
  const data = await User.find();
  return data;
};

//create new user
export const register = async (body) => {
  const { FirstName, LastName, Email, Password } = body
  const data = await User.findOne({Email})
  console.log("Dataa-->",data);
  if(data===null){
  if (body.Password === body.ConfirmPassword) {
    const hashedPassword = await bcrypt.hash(Password, 10)
    const data = await User.create({
      FirstName,
      LastName,
      Email,
      Password: hashedPassword
    })
    return data;
  } else {
    throw new Error("Password did not match")
  }
}else{
  throw new Error("Email already registered")
}


};

export const login = async (body) => {
  const { Email, Password } = body
  if (!Email || !Password) {
    throw Error("Details Not Entered")
  }
  const data = await User.findOne({ Email })
  const result = await bcrypt.compare(Password, data.Password)
  if (data) {
    if (result) {
      return 'Yes you have login page'
    } else {
      throw new Error('Wrong credentials')
    }
  } else {
    throw new Error("Details not found")
  }
}

//createtoken
export const createToken = async (body) => {
  const { _id, Email } = body
  if(Email && _id){
  const token =await jwt.sign({_id}, "appppppsnkakakakakayqooaiiaq" +Email)
  console.log("-------------->>>",token);
  const verify = await jwt.verify(token,"appppppsnkakakakakayqooaiiaq"+Email)
  console.log(verify,"--------------><--------------");
  }else{
    throw Error("Enter ID and Email")
  }
}