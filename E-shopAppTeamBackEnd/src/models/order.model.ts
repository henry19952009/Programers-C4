import {Entity, model, property, belongsTo, hasOne} from '@loopback/repository';
import {Person} from './person.model';
import {Product} from './product.model';

@model()
export class Order extends Entity {
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
  code: string;

  @property({
    type: 'number',
    required: true,
  })
  idProducto: number;

  @property({
    type: 'number',
    required: true,
  })
  cant: number;

  @property({
    type: 'number',
    required: true,
  })
  total: number;

  @property({
    type: 'number',
    required: true,
  })
  state: number;

  @property({
    type: 'date',
    required: true,
  })
  saleData: string;

  @property({
    type: 'date',
    required: true,
  })
  saleTime: string;

  @property({
    type: 'date',
    required: true,
  })
  expirationTime: string;

  @property({
    type: 'number',
    required: true,
  })
  vat: number;

  @property({
    type: 'number',
    required: true,
  })
  discount: number;

  @property({
    type: 'string',
    required: true,
  })
  seller: string;

  @belongsTo(() => Person)
  personId: string;

  @hasOne(() => Product)
  product: Product;

  constructor(data?: Partial<Order>) {
    super(data);
  }
}

export interface OrderRelations {
  // describe navigational properties here
}

export type OrderWithRelations = Order & OrderRelations;
