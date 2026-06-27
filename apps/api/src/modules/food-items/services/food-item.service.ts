import { AppError } from '../../../shared/errors/app-error.js';
import { restaurantRepository } from '../../restaurants/repositories/restaurant.repository.js';
import { foodItemRepository } from '../repositories/food-item.repository.js';
import type { CreateFoodItemInput, UpdateFoodItemInput } from '../types/food-item.types.js';

async function verifyOwnership(restaurantId: string, userId: string) {
  const restaurant = await restaurantRepository.findById(restaurantId);
  if (!restaurant) throw AppError.notFound('Restaurant not found');
  if (restaurant.ownerId.toString() !== userId) {
    throw new AppError('You are not the owner of this restaurant', 403);
  }
  return restaurant;
}

export const foodItemService = {
  async create(restaurantId: string, userId: string, data: CreateFoodItemInput) {
    await verifyOwnership(restaurantId, userId);
    return foodItemRepository.create(restaurantId, data);
  },

  async getById(id: string) {
    const item = await foodItemRepository.findAvailableById(id);
    if (!item) throw AppError.notFound('Food item not found');
    return item;
  },

  async list(restaurantId: string, includeUnavailable: boolean, page: number, limit: number) {
    return foodItemRepository.listByRestaurant(restaurantId, includeUnavailable, page, limit);
  },

  async update(id: string, userId: string, restaurantId: string, data: UpdateFoodItemInput) {
    await verifyOwnership(restaurantId, userId);
    const item = await foodItemRepository.findById(id);
    if (!item) throw AppError.notFound('Food item not found');
    return foodItemRepository.updateById(id, data);
  },

  async delete(id: string, userId: string, restaurantId: string) {
    await verifyOwnership(restaurantId, userId);
    const item = await foodItemRepository.findById(id);
    if (!item) throw AppError.notFound('Food item not found');
    return foodItemRepository.softDelete(id);
  },
};
