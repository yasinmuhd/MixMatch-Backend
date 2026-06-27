import { RestaurantModel, type RestaurantDocument } from './restaurant.model.js';
import type { CreateRestaurantInput, UpdateRestaurantInput } from '../types/restaurant.types.js';

export const restaurantRepository = {
  async create(ownerId: string, data: CreateRestaurantInput): Promise<RestaurantDocument> {
    return RestaurantModel.create({ ...data, ownerId });
  },

  async findById(id: string): Promise<RestaurantDocument | null> {
    return RestaurantModel.findById(id);
  },

  async findActiveById(id: string): Promise<RestaurantDocument | null> {
    return RestaurantModel.findOne({ _id: id, isActive: true });
  },

  async findByOwnerId(ownerId: string): Promise<RestaurantDocument | null> {
    return RestaurantModel.findOne({ ownerId, isActive: true });
  },

  async listActive(page: number, limit: number): Promise<{ docs: RestaurantDocument[]; total: number }> {
    const [docs, total] = await Promise.all([
      RestaurantModel.find({ isActive: true })
        .sort({ createdAt: -1 })
        .skip((page - 1) * limit)
        .limit(limit),
      RestaurantModel.countDocuments({ isActive: true }),
    ]);
    return { docs, total };
  },

  async updateById(id: string, data: UpdateRestaurantInput): Promise<RestaurantDocument | null> {
    return RestaurantModel.findByIdAndUpdate(id, { $set: data }, { new: true, runValidators: true });
  },

  async softDelete(id: string): Promise<RestaurantDocument | null> {
    return RestaurantModel.findByIdAndUpdate(id, { $set: { isActive: false } }, { new: true });
  },
};
