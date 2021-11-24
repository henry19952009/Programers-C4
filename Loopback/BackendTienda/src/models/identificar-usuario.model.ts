import {Model, model, property} from '@loopback/repository';

@model()
export class IdentificarUsuario extends Model {
  @property({
    type: 'string',
    required: true,
  })
  usuario: string;

  @property({
    type: 'string',
    required: true,
  })
  clave: string;


  constructor(data?: Partial<IdentificarUsuario>) {
    super(data);
  }
}

export interface IdentificarUsuarioRelations {
  // describe navigational properties here
}

export type IdentificarUsuarioWithRelations = IdentificarUsuario & IdentificarUsuarioRelations;
