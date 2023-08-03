const request = require('supertest');
const app = require('../app');
const mongoose = require('mongoose');
const User = require('../models/User');

beforeEach(async () => {
  await mongoose.connect('mongodb://mongo:nishanth@node-docdb.cluster-cx1sxzhnitmv.us-east-1.docdb.amazonaws.com:27017/chat_app_db?tls=true&tlsCAFile=global-bundle.pem&replicaSet=rs0&readPreference=secondaryPreferred&retryWrites=false', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

afterEach(async () => {
    await User.deleteMany({});
    await mongoose.connection.close();
  });
  
  describe('User API', () => {
    it('should create a new user', async () => {
      const newUser = {
        name: 'John Doe',
        email: 'john@example.com',
        profilePic: 'profile.jpg',
      };
  
      const response = await request(app).post('/api/users').send(newUser);
  
      expect(response.statusCode).toBe(201);
      expect(response.body.name).toBe(newUser.name);
      expect(response.body.email).toBe(newUser.email);
      expect(response.body.profilePic).toBe(newUser.profilePic);
  
      const user = await User.findOne({ email: newUser.email });
      expect(user).toBeTruthy();
    });
  
    it('should return 400 if name, email, or profilePic is missing', async () => {
      const incompleteUser = {
        name: 'John Doe',
        // Missing email and profilePic
      };
  
      const response = await request(app).post('/api/users').send(incompleteUser);
  
      expect(response.statusCode).toBe(400);
      expect(response.body.error).toBe('Missing required fields');
    });
  
    it('should return 409 if the email already exists', async () => {
      const existingUser = {
        name: 'John Doe',
        email: 'john@example.com',
        profilePic: 'profile.jpg',
      };
  
      await User.create(existingUser);
  
      const response = await request(app).post('/api/users').send(existingUser);
  
      expect(response.statusCode).toBe(409);
      expect(response.body.error).toBe('Email already exists');
    });
  
    it('should get a user by ID', async () => {
      const newUser = {
        name: 'John Doe',
        email: 'john@example.com',
        profilePic: 'profile.jpg',
      };
  
      const createdUser = await User.create(newUser);
  
      const response = await request(app).get(`/api/users/${createdUser._id}`);
  
      expect(response.statusCode).toBe(200);
      expect(response.body.name).toBe(newUser.name);
      expect(response.body.email).toBe(newUser.email);
      expect(response.body.profilePic).toBe(newUser.profilePic);
    });
  
    it('should return 404 if user ID does not exist', async () => {
      const userId = '64be14655d4a0a4b7de261f8'; // A random ID that does not exist
  
      const response = await request(app).get(`/api/users/${userId}`);
  
      expect(response.statusCode).toBe(404);
      expect(response.body.error).toBe('User not found');
    });
  
    // Add more test cases for the user controller here...
  });