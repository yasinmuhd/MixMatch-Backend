import { AppError } from '../../../shared/errors/app-error.js';
import { restaurantRepository } from '../repositories/restaurant.repository.js';
import type { CreateRestaurantInput, UpdateRestaurantInput } from '../types/restaurant.types.js';

export const restaurantService = {
  async create(ownerId: string, data: CreateRestaurantInput) {
    const existing = await restaurantRepository.findByOwnerId(ownerId);
    if (existing) throw AppError.conflict('You already own a restaurant');
    return restaurantRepository.create(ownerId, data);
  },

  async getById(id: string) {
    const restaurant = await restaurantRepository.findActiveById(id);
    if (!restaurant) throw AppError.notFound('Restaurant not found');
    return restaurant;
  },

  async getByOwner(ownerId: string) {
    const restaurant = await restaurantRepository.findByOwnerId(ownerId);
    if (!restaurant) throw AppError.notFound('You do not own a restaurant');
    return restaurant;
  },

  async list(page: number, limit: number) {
    return restaurantRepository.listActive(page, limit);
  },

  async update(id: string, ownerId: string, data: UpdateRestaurantInput) {
    const restaurant = await restaurantRepository.findById(id);
    if (!restaurant) throw AppError.notFound('Restaurant not found');
    if (restaurant.ownerId.toString() !== ownerId) {
      throw new AppError('You are not the owner of this restaurant', 403);
    }
    return restaurantRepository.updateById(id, data);
  },

  async delete(id: string, ownerId: string) {
    const restaurant = await restaurantRepository.findById(id);
    if (!restaurant) throw AppError.notFound('Restaurant not found');
    if (restaurant.ownerId.toString() !== ownerId) {
      throw new AppError('You are not the owner of this restaurant', 403);
    }
    return restaurantRepository.softDelete(id);
  },
};
