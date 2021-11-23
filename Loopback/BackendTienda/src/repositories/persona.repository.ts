import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Persona, PersonaRelations, Credencial, Pedido} from '../models';
import {CredencialRepository} from './credencial.repository';
import {PedidoRepository} from './pedido.repository';

export class PersonaRepository extends DefaultCrudRepository<
  Persona,
  typeof Persona.prototype.id,
  PersonaRelations
> {

  public readonly credencial: BelongsToAccessor<Credencial, typeof Persona.prototype.id>;

  public readonly pedidos: HasManyRepositoryFactory<Pedido, typeof Persona.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('CredencialRepository') protected credencialRepositoryGetter: Getter<CredencialRepository>, @repository.getter('PedidoRepository') protected pedidoRepositoryGetter: Getter<PedidoRepository>,
  ) {
    super(Persona, dataSource);
    this.pedidos = this.createHasManyRepositoryFactoryFor('pedidos', pedidoRepositoryGetter,);
    this.registerInclusionResolver('pedidos', this.pedidos.inclusionResolver);
    this.credencial = this.createBelongsToAccessorFor('credencial', credencialRepositoryGetter,);
    this.registerInclusionResolver('credencial', this.credencial.inclusionResolver);
  }
}
