import { expect } from 'chai';
import request from 'supertest';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken'
import app from '../../src/index';
let sucUser1
let unsucUser1
let token1
let token2
let note1
let noteId
describe('User APIs Test', () => {
  before((done) => {
    const clearCollections = () => {
      for (const collection in mongoose.connection.collections) {
        mongoose.connection.collections[collection].deleteOne(() => { });
      }
    };

    const mongooseConnect = async () => {
      await mongoose.connect(process.env.DATABASE_TEST);
      clearCollections();
    };

    if (mongoose.connection.readyState === 0) {
      mongooseConnect();
    } else {
      clearCollections();
    }

    done();
  });

  describe('POST /users', () => {
    it('1.1whenEnterValiddetailsShouldReturn201', (done) => {
      sucUser1 = {
        "FirstName": "Prathmesh",
        "LastName": "Emaiss",
        "Email": "Prathameshvarm321@gmail.com",
        "Password": "12345678",
        "ConfirmPassword": "12345678"
      }
      request(app)
        .post('/api/v1/users')
        .send(sucUser1)
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(201);
          expect(res.body.data).to.be.an('object');
          done();
        });
    })

    it('1.2whenEnterInValiddetailsShouldReturn500', (done) => {
      unsucUser1 = {
        "FirstName": "Pra",
        "LastName": "Emaiss",
        "Email": "Prathameshvarm321@gmail.com",
        "Password": "12345678"

      }
      request(app)
        .post('/api/v1/users')
        .send(unsucUser1)
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(500);

          done();
        });
    });

    it('1.3whenEnterValiddetailsShouldReturn201', (done) => {
      unsucUser1 = {
        "FirstName": "Romil",
        "LastName": "bhau",
        "Email": "Romilvarm321@gmail.com",
        "Password": "12345678",
        "ConfirmPassword": "12345678"

      }
      request(app)
        .post('/api/v1/users')
        .send(unsucUser1)
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(201);

          done();
        });
    });

    it('1.4whenEnterInValiddetailsShouldReturn200', (done) => {
      unsucUser1 = {
        "Email": "Romilvarm321@gmail.com",
        "Password": "12345678"
      }
      request(app)
        .post('/api/v1/users/login')
        .send(unsucUser1)
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(200);
         
          token2 = res.body.data
          console.log(token1);
          done();
        });
    });

    it('1.5whenGivenValidEmailForForgetPassword200', (done) => {
      unsucUser1 = {
        "Email": "Romilvarm321@gmail.com" 
      }
      request(app)
        .post('/api/v1/users/forgetpassword')
        .send(unsucUser1)
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(200);
          done();
        });
    });

    it('1.6whenGivenValidEmailForRestPassword200', (done) => {
      const password = {
        "Password":"1234567uu8"
      }
      token1 = jwt.sign({Email:"Prathams123@gmail.com"},process.env.SECRET_KEY_PASSWORD)
      request(app)
        .put(`/api/v1/users/resetpassword/${token1}`)
        .send(password)
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(200);
          done();
        });
    });
  });

  describe('POST /Notes', () => {
    it('1.1whenEnterdetailsCreateNote201', (done) => {
      note1 = {
     "Title":"Note-1",
     "Description":"1111111111111111"
      }
      
      request(app)
        .post('/api/v1/notes')
        .set('Authorization',`Bearer ${token2}`)
        .send(note1)
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(201);
          noteId = res.body.data._id
          
          done();
        });
    });

    it('1.2whenEnterdetailsCreateNote201', (done) => {
      note1 = {
     "Title":"Note-2",
     "Description":"1111111111111111"
      }
      request(app)
        .post('/api/v1/notes')
        .set('Authorization',`Bearer ${token2}`)
        .send(note1)
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(201);
          expect(res.body.data).to.be.an('object')
          done();
        });
    });

    it('1.3whenEnterdetailsgetAllNote200', (done) => {
      note1 = {
     "Title":"Note-2",
     "Description":"1111111111111111"
      }
      request(app)
        .get('/api/v1/notes')
        .set('Authorization',`Bearer ${token2}`)
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(200);
          
          done();
        });
    });

    it('1.4whenEnterdetailsgetNote200', (done) => {
      
      request(app)
        .get(`/api/v1/notes/${noteId}`)
        .set('Authorization',`Bearer ${token2}`)
        .send(note1)
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(200);
          done();
        });
    });

    it('1.5whenEnterdetailsgetNote200', (done) => {
      note1={
        "Title":"Note-updated",
        "Description":"______updated===="
      }
      request(app)
        .put(`/api/v1/notes/${noteId}`)
        .set('Authorization',`Bearer ${token2}`)
        .send(note1)
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(201);
          done();
        });
    });

    it('1.6whenEnterdetailsshouldUpdateStatus200', (done) => {
      
      request(app)
        .put(`/api/v1/notes/${noteId}/Archieve`)
        .set('Authorization',`Bearer ${token2}`)
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(201);
          done();
        });
    });

    it('1.7whenEnterdetailsshouldUpdateStatusOfArchievePreviousOne200', (done) => {
      
      request(app)
        .put(`/api/v1/notes/${noteId}/Archieve`)
        .set('Authorization',`Bearer ${token2}`)
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(201);
          done();
        });
    });

    it('1.8whenEnterdetailsshouldUpdateStatusOfTrashPreviousOne200', (done) => {
      
      request(app)
        .put(`/api/v1/notes/${noteId}/Trash`)
        .set('Authorization',`Bearer ${token2}`)
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(201);
          done();
        });
    });

    it('1.9whenEnterdetailsshouldDeleteNote400', (done) => {
      
      request(app)
        .delete(`/api/v1/notes/${noteId}`)
        .set('Authorization',`Bearer ${token2}`)
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(502);
          done();
        });
    });


  })



});

