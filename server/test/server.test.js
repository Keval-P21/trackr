const express = require('express');
const router = require('../router');
const supertest = require('supertest');
const mongoose = require('mongoose');
const JobModel = require('../models/jobSchema');
const EventModel = require('../models/eventSchema');
const admin = require('../firebase-config/firebase-config');
const mock = require('./mocks/mock');
require('dotenv').config();

const databaseName = 'test';


describe('Integration tests', () => {
  const app = express();
  app.use(express.json());
  app.use(router);

  const request = supertest(app);

  let uid = null;
  let token = null;

  

  beforeAll(async () => {

    const dbURL = `mongodb://127.0.0.1:27017/${databaseName}`;
    await mongoose.connect(dbURL, {useNewUrlParser: true});

    const testUser = await admin.auth().getUserByEmail('test@example.com');

    uid = testUser.uid;

  })


  beforeEach(async () => {

    jest.setTimeout(20000);

    customToken = await admin.auth().createCustomToken(uid);

    const res = await fetch(`https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyCustomToken?key=AIzaSyCB7fOgVmoZFw5kbvtVEazRpPYQFOSF1MQ`,
      {
        method: 'POST',
        body: JSON.stringify({
          token: customToken,
          returnSecureToken: true
        }),
        headers: {
          'Content-type': 'application/json'
        }
      });

      const tokenRes = await res.json();
      token = tokenRes.idToken;
  });


  afterEach(async () => {
    await JobModel.deleteMany();
    await EventModel.deleteMany();
  });



  describe('Job Routes', () => {
    it('should get jobs from the DB', async () => {
  
      const post1 = await request.post('/jobs/testUser123', )
      .set('authorization', 'Bearer ' + token)
      .send(mock.mockJob1);
  
      const post2 = await request.post('/jobs/testUser123', )
      .set('authorization', 'Bearer ' + token)
      .send(mock.mockJob2);
  
  
      const res = await request.get('/jobs/testUser123', )
      .set('authorization', 'Bearer ' + token);
  
  
      expect(res.status).toBe(200);
      expect(res.body).toEqual([post1.body, post2.body]);
    })
  
  
  
    it('should save a job to the DB', async () => {
  
      const res = await request.post('/jobs/testUser123', )
      .set('authorization', 'Bearer ' + token)
      .send(mock.mockJob1)
  
      const job = await JobModel.findOne(mock.mockJob1);
      expect(job.company).toBe(mock.mockJob1.company);
      expect(job.title).toBe(mock.mockJob1.title);
      expect(job.userId).toBe(mock.mockJob1.userId);
      expect(job.location).toBe(mock.mockJob1.location);
      expect(job.salary).toBe(mock.mockJob1.salary);
      expect(job.post_url).toBe(mock.mockJob1.post_url);
      expect(job.color).toBe(mock.mockJob1.color);
      expect(res.status).toBe(201);
    })
  
  
    it('should delete a job on delete route', async () => {
  
      const post = await request.post('/jobs/testUser123', )
      .set('authorization', 'Bearer ' + token)
      .send(mock.mockJob1)
  
      const id = post.body._id;
  
      const post2 = await request.post('/jobs/testUser123', )
      .set('authorization', 'Bearer ' + token)
      .send(mock.mockJob2);
  
  
      const deleteRes = await request.delete('/jobs/' + id, )
      .set('authorization', 'Bearer ' + token);
  
  
      const getRes = await request.get('/jobs/testUser123', )
      .set('authorization', 'Bearer ' + token);
  
      expect(deleteRes.status).toBe(204);
      expect(getRes.status).toBe(200);
      expect(getRes.body).toEqual([post2.body]);
    })
  
  
  
    it('should update a job on update route', async () => {
  
      const post = await request.post('/jobs/testUser123', )
      .set('authorization', 'Bearer ' + token)
      .send(mock.mockJob1)
  
      const id = post.body._id;
  
      const updateRes = await request.put('/jobs/' + id, )
      .set('authorization', 'Bearer ' + token)
      .send(mock.updateFields);
  
  
      const getRes = await request.get('/jobs/testUser123', )
      .set('authorization', 'Bearer ' + token);

      const resJob = getRes.body[0];
  
      expect(updateRes.status).toBe(200);
      expect(getRes.status).toBe(200);
  
      expect(resJob._id).toEqual(id);
      expect(resJob.title).toEqual(mock.mockJobUpdate.title);
      expect(resJob.company).toEqual(mock.mockJobUpdate.company);
      expect(resJob.location).toEqual(mock.mockJobUpdate.location);
      expect(resJob.salary).toEqual(mock.mockJobUpdate.salary);
    })
  })


  describe('Event Routes', () => {

    it('should get events from the DB', async () => {
  
      await request.post('/events/' + mock.mockEvent1.jobId, )
      .set('authorization', 'Bearer ' + token)
      .send(mock.mockEvent1);
  
      await request.post('/events/' + mock.mockEvent2.jobId, )
      .set('authorization', 'Bearer ' + token)
      .send(mock.mockEvent2);
  
  
      const res = await request.get('/events/testUser123', )
      .set('authorization', 'Bearer ' + token);

      const resEvent1 = res.body[0];
      const resEvent2 = res.body[1];
      
  
      expect(res.status).toBe(200);
      expect(resEvent1.name).toEqual(mock.mockEvent1.name);
      expect(resEvent1.location).toEqual(mock.mockEvent1.location);
      expect(resEvent1.start_date).toEqual(mock.mockEvent1.start_date);
      expect(resEvent2.name).toEqual(mock.mockEvent2.name);
      expect(resEvent2.location).toEqual(mock.mockEvent2.location);
      expect(resEvent2.start_date).toEqual(mock.mockEvent2.start_date);
    })


    it('should save an event to the DB', async () => {
  
      const res = await request.post('/events/' + mock.mockEvent1.jobId, )
      .set('authorization', 'Bearer ' + token)
      .send(mock.mockEvent1);
  
      const event = await EventModel.findOne(mock.mockEvent1);
      expect(event.jobId).toBe(mock.mockEvent1.jobId);
      expect(event.name).toBe(mock.mockEvent1.name);
      expect(event.userId).toBe(mock.mockEvent1.userId);
      expect(event.location).toBe(mock.mockEvent1.location);
      expect(event.desciption).toBe(mock.mockEvent1.desciption);
      expect(event.start_date).toBe(mock.mockEvent1.start_date);
      expect(event.end_date).toBe(mock.mockEvent1.end_date);
      expect(event.start_time).toBe(mock.mockEvent1.start_time);
      expect(event.end_time).toBe(mock.mockEvent1.end_time);
      expect(res.status).toBe(201);
    })


    it('should delete an event on delete route', async () => {
  
      await request.post('/events/' + mock.mockEvent1.jobId, )
      .set('authorization', 'Bearer ' + token)
      .send(mock.mockEvent1);

      const res = await request.get('/events/testUser123', )
      .set('authorization', 'Bearer ' + token);
  
      const id = res.body[0]._id;
  
      await request.post('/events/' + mock.mockEvent2.jobId, )
      .set('authorization', 'Bearer ' + token)
      .send(mock.mockEvent2);
  
  
      const deleteRes = await request.delete('/events/' + id, )
      .set('authorization', 'Bearer ' + token);
  
  
      const getRes = await request.get('/events/testUser123', )
      .set('authorization', 'Bearer ' + token);

      const resEvent = getRes.body[0];
  
      expect(deleteRes.status).toBe(204);
      expect(getRes.status).toBe(200);
      expect(getRes.body.length).toEqual(1);
      expect(resEvent.name).toEqual(mock.mockEvent2.name);
      expect(resEvent.jobId).toEqual(mock.mockEvent2.jobId);
      expect(resEvent.userId).toEqual(mock.mockEvent2.userId);
      expect(resEvent.desciption).toEqual(mock.mockEvent2.desciption);
      expect(resEvent.location).toEqual(mock.mockEvent2.location);


      //Need to return data back after post.
    })


    it('should update an event on update route', async () => {
  
      await request.post('/events/' + mock.mockEvent1.jobId, )
      .set('authorization', 'Bearer ' + token)
      .send(mock.mockEvent1);

      const res = await request.get('/events/testUser123', )
      .set('authorization', 'Bearer ' + token);
  
      const id = res.body[0]._id;
  
      const updateRes = await request.put('/events/' + id, )
      .set('authorization', 'Bearer ' + token)
      .send(mock.eventUpdateFields);
  
  
      const getRes = await request.get('/events/testUser123', )
      .set('authorization', 'Bearer ' + token);

      const resEvent = getRes.body[0];
  
      expect(updateRes.status).toBe(200);
      expect(getRes.status).toBe(200);
  
      expect(resEvent._id).toEqual(id);
      expect(resEvent.name).toEqual(mock.mockEventUpdate.name);
      expect(resEvent.jobId).toEqual(mock.mockEventUpdate.jobId);
      expect(resEvent.location).toEqual(mock.mockEventUpdate.location);
      expect(resEvent.userId).toEqual(mock.mockEventUpdate.userId);
      expect(resEvent.start_date).toEqual(mock.mockEventUpdate.start_date);
      expect(resEvent.end_date).toEqual(mock.mockEventUpdate.end_date);
    })
  
    
  })
})