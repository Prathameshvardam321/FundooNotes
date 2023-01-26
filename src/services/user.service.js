import User from '../models/user.model';

//get all users
export const getAllUsers = async () => {
  const data = await User.find();
  return data;
};

//check user
export const checkUsers = async (emailValue) => {
  const data = await User.find({ Email: emailValue });
  // console.log("------------->>>", data);
  if (data) {
   
    return data;
  } else {
    throw new Error('Not found')
  }
}

//create new user
export const newUser = async (body) => {
  const data = await User.create(body);
  return data;
};

//update single user
export const updateUser = async (_id, body) => {
  const data = await User.findByIdAndUpdate(
    {
      _id
    },
    body,
    {
      new: true
    }
  );
  return data;
};

//delete single user
export const deleteUser = async (id) => {
  await User.findByIdAndDelete(id);
  return '';
};

//get single user
export const getUser = async (id) => {
  const data = await User.findById(id);
  return data;
};

// export const validateUser = async (body) => {
//   const { Email, Password } = body
//   if(!Email || !Password){
//     throw new Error("Details not Entered")
//   }
//   const data = await User.findOne({ Email })
//   console.log(data);
//   if (!data) {
//      throw new Error("Not found")
//   } 
//   if(Password===data.Password){
//     return "Valid User"
//   }
//   return "Invalid User"
// }

// export const validateUser = async (body)=>{
//   const {Email,Password} = body
//   if(!Email || !Password){
//     throw Error("Details Not Entered")
//   }
//   const data = await User.findOne({ Email })

//   if (data) {
//     if(data.Password===Password){
//       return 'Yes you have login page'
//     }else{
//       throw new Error('Wrong credentials')
//     }
//   }else{
//     throw new Error("Details not found")
//   }
// }