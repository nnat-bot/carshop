import type { Car, CarData } from './types';

const BASE_URL = 'https://car-rest-service-carshop.2.rahtiapp.fi';

export async function getCars(): Promise<Car[]> {
  const response = await fetch(`${BASE_URL}/cars`);
  if (!response.ok) throw new Error('Error when fetching cars: ' + response.statusText);
  const data = await response.json();
  return data._embedded.cars;
}

export async function addCar(car: CarData) {
  const response = await fetch(`${BASE_URL}/cars`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(car),
  });
  if (!response.ok) throw new Error('Error when adding car: ' + response.statusText);
}

export async function updateCar(url: string, car: CarData) {
  const response = await fetch(url, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(car),
  });
  if (!response.ok) throw new Error('Error when updating car: ' + response.statusText);
}

export async function deleteCar(url: string) {
  const response = await fetch(url, { method: 'DELETE' });
  if (!response.ok) throw new Error('Error when deleting car: ' + response.statusText);
}