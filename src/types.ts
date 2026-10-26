export type CarData = {
  brand: string;
  model: string;
  color: string;
  fuel: string;
  modelYear: number;
  price: number;
};

export type Car = CarData & {
  _links: {
    self: { href: string };
    car: { href: string };
  };
};
