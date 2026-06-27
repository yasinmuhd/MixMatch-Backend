import { z } from 'zod';

const coordinatesSchema = z.object({
  lat: z.number().finite(),
  lng: z.number().finite(),
});

const addressSchema = z.object({
  street: z.string().trim().optional(),
  city: z.string().trim().min(1, 'City is required'),
  country: z.string().trim().min(1, 'Country is required'),
  coordinates: coordinatesSchema.optional(),
});

export const createRestaurantSchema = z.object({
  name: z.string().trim().min(2).max(100),
  description: z.string().trim().max(500).optional(),
  address: addressSchema,
  cuisineTags: z.array(z.string()).max(5).optional(),
  logoUrl: z.string().url().nullable().optional(),
  coverImageUrl: z.string().url().nullable().optional(),
});

export const updateRestaurantSchema = z.object({
  name: z.string().trim().min(2).max(100).optional(),
  description: z.string().trim().max(500).optional(),
  address: addressSchema.partial().optional(),
  cuisineTags: z.array(z.string()).max(5).optional(),
  logoUrl: z.string().url().nullable().optional(),
  coverImageUrl: z.string().url().nullable().optional(),
});
