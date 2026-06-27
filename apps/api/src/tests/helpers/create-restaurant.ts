import type { Express } from 'express';
import request from 'supertest';

const DEFAULT_RESTAURANT = {
  name: 'Test Restaurant',
  description: 'A test restaurant',
  address: { city: 'Lagos', country: 'Nigeria' },
  cuisineTags: ['italian'],
};

export async function createRestaurant(app: Express, token: string, overrides?: Record<string, unknown>) {
  const res = await request(app)
    .post('/api/restaurants')
    .set('Authorization', `Bearer ${token}`)
    .send({ ...DEFAULT_RESTAURANT, ...overrides });
  return res.body.data;
}
