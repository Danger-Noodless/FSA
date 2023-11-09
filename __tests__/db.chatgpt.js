const request = require('supertest');
const app = require('../server/server.js'); // Replace with the path to your Express app
const { Client } = require('pg'); // Make sure to include the pg client

// Mock db
// When we call new Client(), instead of getting a real PostgreSQL client,
// we get our mocked mClient with methods that we can program to resolve or reject
// with whatever values we want to test.
jest.mock('pg', () => {
  const mClient = {
    query: jest.fn(),
    connect: jest.fn(),
    end: jest.fn(),
  };
  return { Client: jest.fn(() => mClient) };
});

describe('Database Controller', () => {
  describe('getuser', () => {
    it('should retrieve user data if username is found', async () => {
      const mClient = new Client();
      const userName = 'testUser';
      const mockUserResult = { rows: [{ id: 1, username: 'testUser' }] };
      mClient.query.mockResolvedValueOnce(mockUserResult);

      const response = await request(app)
        .get('/path-to-getuser') // Replace with your actual endpoint
        .send({ user: userName })
        .expect('Content-Type', /json/)
        .expect(200); // Status 200 for success

      expect(response.body.user).toEqual(mockUserResult.rows[0]);
      expect(mClient.query).toHaveBeenCalledWith(
        'SELECT * FROM fsa_app_db WHERE username = $1',
        [userName]
      );
    });

    it('should return error if username is not provided', async () => {
      const response = await request(app)
        .get('/path-to-getuser') // Replace with your actual endpoint
        .send({}) // Not sending a username here to test the error
        .expect('Content-Type', /json/)
        .expect(400); // Status 400 for client error

      expect(response.body.error).toBeDefined();
    });

    it('should return error if user is not found', async () => {
      const mClient = new Client();
      const userName = 'nonexistentUser';
      mClient.query.mockResolvedValueOnce({ rows: [] });

      const response = await request(app)
        .get('/path-to-getuser') // Replace with your actual endpoint
        .send({ user: userName })
        .expect('Content-Type', /json/)
        .expect(404); // Status 404 for not found

      expect(response.body.error).toBeDefined();
    });

    // Add more tests for different scenarios, such as database errors
  });
});

// In this example, we've mocked the PostgreSQL client because you don't want
// to hit an actual database during tests. Instead, you want to simulate responses
// from the database to ensure your controller behaves as expected.
