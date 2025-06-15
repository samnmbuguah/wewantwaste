export interface Skip {
  id: string;
  size: number;
  price_before_vat: number;
  vat: number;
  hire_period_days: number;
  allowed_on_road: boolean;
  description: string;
  transport_cost?: number;
  per_tonne_cost?: number;
  postcode?: string;
  area?: string;
  allows_heavy_waste?: boolean;
}

export type SkipResponse = Skip[]; 