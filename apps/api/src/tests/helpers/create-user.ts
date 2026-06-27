import type { Express } from 'express';
import request from 'supertest';

let counter = 0;

export async function createUser(app: Express, email?: string) {
  counter++;
  const userEmail = email ?? `testuser-${counter}-${Date.now()}@example.com`;
  const res = await request(app).post('/api/auth/register').send({
    email: userEmail,
    password: 'password123',
  });
  return { token: res.body.token as string, userId: res.body.user.id as string, email: userEmail };
}
