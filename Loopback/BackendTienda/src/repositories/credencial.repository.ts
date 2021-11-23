import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Credencial, CredencialRelations} from '../models';

export class CredencialRepository extends DefaultCrudRepository<
  Credencial,
  typeof Credencial.prototype.id,
  CredencialRelations
> {
  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource,
  ) {
    super(Credencial, dataSource);
  }
}
