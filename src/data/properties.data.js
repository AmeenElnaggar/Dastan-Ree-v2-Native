/**
 * Individual property units (re-exports project items shaped as properties).
 * In a real app this would come from an API.
 */
import { projects } from './projects.data.js';

export const properties = projects.map(p => ({
  id: p.id,
  name: p.name,
  location: p.location,
  type: p.type,
  status: p.status,
  price: p.price,
  bedrooms: p.bedrooms,
  bathrooms: p.bathrooms,
  area: p.area,
  image: p.image,
}));
