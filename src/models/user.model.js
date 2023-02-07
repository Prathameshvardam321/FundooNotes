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


export default model('User', userSchema);
