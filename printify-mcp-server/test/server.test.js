/**
 * Server integration tests
 */

const request = require('supertest');
const app = require('../src/server');

describe('Server', () => {
  describe('Documentation Endpoints', () => {
    it('should serve Swagger UI documentation', async () => {
      const response = await request(app).get('/api-docs/');
      expect(response.status).toBe(200);
      expect(response.text).toContain('swagger');
    });
  });

  describe('Authentication', () => {
    it('should require authentication for API endpoints', async () => {
      const response = await request(app).get('/api/v1/shops');
      expect(response.status).toBe(401);
      expect(response.body).toHaveProperty('message');
    });

    it('should reject invalid authentication', async () => {
      const response = await request(app)
        .get('/api/v1/shops')
        .set('Authorization', 'Bearer invalid-token');
      expect(response.status).toBe(401);
      expect(response.body).toHaveProperty('message');
    });
  });

  // These tests would be expanded with proper mocking of the Printify service
  // and valid authentication tokens
});