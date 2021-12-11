import {Entity, model, property} from '@loopback/repository';

@model()
export class Product extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  name: string;

  @property({
    type: 'string',
    required: true,
  })
  description: string;

  @property({
    type: 'number',
    required: true,
  })
  stock: number;

  @property({
    type: 'number',
    required: true,
  })
  unitValue: number;

  @property({
    type: 'number',
    required: true,
  })
  discount: number;

  @property({
    type: 'number',
    required: true,
  })
  vat: number;

  @property({
    type: 'number',
    required: true,
  })
  total: number;

  @property({
    type: 'string',
  })
  orderId?: string;

  @property({
    type: 'string',
    required: true,
  })
  image?: string;

  constructor(data?: Partial<Product>) {
    super(data);
  }
}

export interface ProductRelations {
  // describe navigational properties here
}

export type ProductWithRelations = Product & ProductRelations;
