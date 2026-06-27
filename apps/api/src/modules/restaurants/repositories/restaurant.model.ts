import { Schema, model, type HydratedDocument, type InferSchemaType } from 'mongoose';

const coordinatesSchema = new Schema(
  {
    lat: { type: Number, required: true },
    lng: { type: Number, required: true },
  },
  { _id: false },
);

const addressSchema = new Schema(
  {
    street: { type: String, trim: true },
    city: { type: String, required: true, trim: true },
    country: { type: String, required: true, trim: true },
    coordinates: { type: coordinatesSchema },
  },
  { _id: false },
);

const restaurantSchema = new Schema(
  {
    ownerId: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
    name: { type: String, required: true, trim: true, minlength: 2, maxlength: 100 },
    description: { type: String, trim: true, maxlength: 500, default: '' },
    address: { type: addressSchema, required: true },
    cuisineTags: { type: [String], default: [] },
    logoUrl: { type: String, default: null },
    coverImageUrl: { type: String, default: null },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true },
);

export type RestaurantAttributes = InferSchemaType<typeof restaurantSchema>;
export type RestaurantDocument = HydratedDocument<RestaurantAttributes>;

export const RestaurantModel = model('Restaurant', restaurantSchema);
