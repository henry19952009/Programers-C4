import {Entity, model, property} from '@loopback/repository';

@model()
export class Producto extends Entity {
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
  nombre: string;

  @property({
    type: 'string',
  })
  descripcion?: string;

  @property({
    type: 'number',
    required: true,
  })
  disponibles: number;

  @property({
    type: 'number',
    required: true,
  })
  valor_unitario: number;

  @property({
    type: 'number',
    required: true,
  })
  descuento: number;

  @property({
    type: 'number',
    required: true,
  })
  iva: number;

  @property({
    type: 'number',
    required: true,
  })
  total: number;

  @property({
    type: 'string',
  })
  pedidoId?: string;

  constructor(data?: Partial<Producto>) {
    super(data);
  }
}

export interface ProductoRelations {
  // describe navigational properties here
}

export type ProductoWithRelations = Producto & ProductoRelations;
