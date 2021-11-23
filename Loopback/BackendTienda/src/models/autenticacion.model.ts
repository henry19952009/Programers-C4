import {Entity, model, property} from '@loopback/repository';

@model()
export class Autenticacion extends Entity {
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
  email: string;

  @property({
    type: 'string',
    required: false,
  })
  clave: string;

  @property({
    type: 'string',
    required: true,
  })
  rol: string;


  constructor(data?: Partial<Autenticacion>) {
    super(data);
  }
}

export interface AutenticacionRelations {
  // describe navigational properties here
}

export type AutenticacionWithRelations = Autenticacion & AutenticacionRelations;
