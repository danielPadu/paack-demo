 
export type CustomerTypes = {
  name?: string|null;
  address?: string|null;
  city?: string|null;
  zipCode?: string|null;
  latitude?: string|null;
  longitude?: string|null;
}
export type DeliveryTypes = {
  status?: 'idle' | 'delivered' | 'undelivered';
  latitude: number;
  longitude: number;
}
export type DeliveryListItemTypes
 = {
  id: string;
  client: string;
  customer?: CustomerTypes;
  delivery?: DeliveryTypes;
};
export type Capitalizer<Type> = {
  [Property in keyof Type as `${Capitalize<string & Property>}`]: () => Type[Property]
};
export type Concrete<Type> = {
  [Property in keyof Type]-?: Type[Property];
};
export type CreateMutable<Type> = {
  -readonly [Property in keyof Type]: Type[Property];
};