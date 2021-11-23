import {Entity, model, property, hasMany} from '@loopback/repository';
import {Producto} from './producto.model';

@model()
export class Pedido extends Entity {
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
  codigo: string;

  @property({
    type: 'date',
    required: true,
  })
  fecha_venta?: string;

  @property({
    type: 'string',
    required: true,
  })
  hora_venta: string;

  @property({
    type: 'date',
  })
  fecha_vencimiento?: string;

  @property({
    type: 'number',
    required: true,
  })
  cantidad: number;

  @property({
    type: 'number',
    required: true,
  })
  descuento: number;

  @property({
    type: 'number',
    required: true,
  })
  iva_total: number;

  @property({
    type: 'number',
    required: true,
  })
  valor_total: number;

  @property({
    type: 'string',
    required: true,
  })
  estado: string;

  @property({
    type: 'string',
    required: true,
  })
  vendedor: string;

  @property({
    type: 'string',
  })
  personaId?: string;

  @hasMany(() => Producto)
  productos: Producto[];

  constructor(data?: Partial<Pedido>) {
    super(data);
  }
}

export interface PedidoRelations {
  // describe navigational properties here
}

export type PedidoWithRelations = Pedido & PedidoRelations;
