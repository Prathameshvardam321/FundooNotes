import HttpStatus from 'http-status-codes';
import jwt from 'jsonwebtoken';
const util = require('util')
const axios = require('axios')
export var userName
import { client , status} from '../config/redis'
export const userAuth = async (req, res, next) => {
  try {
    let bearerToken = req.header('Authorization');
    console.log("Req of auth----->", req.body);
    if (!bearerToken)
      throw {
        code: HttpStatus.BAD_REQUEST,
        message: 'Authorization token is required'
      };
    bearerToken = bearerToken.split(' ')[1];
    const user = await jwt.verify(bearerToken, process.env.SECRET_KEY);
    req.body.UserId = user.Id
    userName = user.Id
    next();
  } catch (error) {
    next(error);
  }
};


export const resetPasswordAuth = async (req, res, next) => {
  try {
    let bearerToken = req.params.tokenId
    if (!bearerToken)
      throw {
        code: HttpStatus.BAD_REQUEST,
        message: 'Authorization token is required'
      };
    const user = await jwt.verify(bearerToken, process.env.SECRET_KEY_PASSWORD);
    req.body.Email = user.Email
    next();
  } catch (error) {
    next(error)
  }
}


// export const cacheGetAllNotes = async (req, res, next) => {

//   try {

//     const { _id } = req.params
//     if (status) {
//       console.log("Enter If--------->");
//       let key = req.body.UserId
//       // let response = await axios.get(`http://localhost:3000/api/v1/notes/${k}`)
//       if(status){
//         let response =  client.get(`key${_id}`)
//         console.log(response);
//       }
//     }
//     next()
//   } catch (error) {
//     next(error)
//   }
// }



export const cacheGetAllNotes = async (req, res, next) => {

  try {
    console.log(status);
    if (status) {
      let getAllNotes = await client.get(`Note-${req.body.UserId}`)
      let Notes = JSON.parse(getAllNotes)
      
      if (Notes) {
        console.log("Hit cache");
        return res.status(HttpStatus.OK).json({
            code: HttpStatus.OK,
            data: Notes,
            message: 'All notes fetched from redis'
        });
    }
    console.log("Into Mongo1------------------");
    }
    console.log("Into Mongo2------------------");
    next()
  }catch(er){
next(er)
  }
}

export const cacheGetNoteById = async (req, res, next) => {

  try {
    console.log(status);
    if (status) {
      let getAllNotes = await client.get(`Note-${req.params._id}`)
      let Note = JSON.parse(getAllNotes)
      if (Note) {
        console.log("Hit cache");
        return res.status(HttpStatus.OK).json({
            code: HttpStatus.OK,
            data: Note,
            message: 'Note fetched from redis '
        });
    }
    }
    console.log("Into Mongo------------------");
    next()
  }catch(er){
next(er)
  }
}