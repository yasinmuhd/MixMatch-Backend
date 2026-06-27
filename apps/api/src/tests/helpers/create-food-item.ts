import type { Express } from 'express';
import request from 'supertest';

const DEFAULT_FOOD_ITEM = {
  name: 'Margherita Pizza',
  description: 'Classic pizza',
  price: 1200,
  category: 'main',
  dietaryTags: ['vegetarian'],
};

export async function createFoodItem(
  app: Express,
  token: string,
  restaurantId: string,
  overrides?: Record<string, unknown>,
) {
  const res = await request(app)
    .post(`/api/restaurants/${restaurantId}/food-items`)
    .set('Authorization', `Bearer ${token}`)
    .send({ ...DEFAULT_FOOD_ITEM, ...overrides });
  return res.body.data;
}
