import {Model, model, property} from '@loopback/repository';

@model()
export class Credentials extends Model {
  email(email: any) {
    throw new Error('Method not implemented.');
  }
  @property({
    type: 'string',
    required: true,
  })
  user: string;

  @property({
    type: 'string',
    required: true,
  })
  key: string;

  constructor(data?: Partial<Credentials>) {
    super(data);
  }
}

export interface CredentialsRelations {
  // describe navigational properties here
}

export type CredentialsWithRelations = Credentials & CredentialsRelations;
