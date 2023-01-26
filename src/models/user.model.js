import { Schema, model } from 'mongoose';
const bcrypt = require('bcrypt')
const userSchema = new Schema(
  {
    FirstName: {
      type: String,
      require : true
    },
    LastName: {
      type: String,
      require : true
    },
    Email : {
      type: String,
      require : true,
      unique : true
    },
    Password : {
      type: String,
      require : true
    },
    ConfirmPassword : {
      type: String,
      require : true
    }
  },
  {
    timestamps: true
  }
);
// userSchema.pre('save',async function (next){
//   if(this.isModified('Password')){
//     this.Password = bcrypt.hash(this.Password,12)
//     this.ConfirmPassword = bcrypt.hash(this.ConfirmPassword,12)
//   }
//   next()
//   })
export default model('User', userSchema);
