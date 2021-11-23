import {Entity, model, property} from '@loopback/repository';

@model()
export class Credencial extends Entity {
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


  constructor(data?: Partial<Credencial>) {
    super(data);
  }
}

export interface CredencialRelations {
  // describe navigational properties here
}

export type CredencialWithRelations = Credencial & CredencialRelations;
