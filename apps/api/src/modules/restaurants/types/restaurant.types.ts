export interface RestaurantAddress {
  street?: string;
  city: string;
  country: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
}

export interface CreateRestaurantInput {
  name: string;
  description?: string;
  address: RestaurantAddress;
  cuisineTags?: string[];
  logoUrl?: string | null;
  coverImageUrl?: string | null;
}

export interface UpdateRestaurantInput {
  name?: string;
  description?: string;
  address?: Partial<RestaurantAddress>;
  cuisineTags?: string[];
  logoUrl?: string | null;
  coverImageUrl?: string | null;
}
