import { Skip } from '../types/skip';

export const skipData: Skip[] = [
  {
    id: '1',
    size: 4,
    price_before_vat: 180,
    vat: 20,
    hire_period_days: 14,
    allowed_on_road: true,
    description: 'Perfect for small household clearances and garden waste'
  },
  {
    id: '2',
    size: 6,
    price_before_vat: 220,
    vat: 20,
    hire_period_days: 14,
    allowed_on_road: true,
    description: 'Ideal for medium-sized home renovations and garden projects'
  },
  {
    id: '3',
    size: 8,
    price_before_vat: 280,
    vat: 20,
    hire_period_days: 14,
    allowed_on_road: false,
    description: 'Great for larger home renovations and construction projects'
  }
]; 