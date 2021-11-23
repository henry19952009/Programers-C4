import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Persona, PersonaRelations, Autenticacion, Pedido} from '../models';
import {AutenticacionRepository} from './autenticacion.repository';
import {PedidoRepository} from './pedido.repository';

export class PersonaRepository extends DefaultCrudRepository<
  Persona,
  typeof Persona.prototype.id,
  PersonaRelations
> {

  public readonly autenticacion: BelongsToAccessor<Autenticacion, typeof Persona.prototype.id>;

  public readonly pedidos: HasManyRepositoryFactory<Pedido, typeof Persona.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('AutenticacionRepository') protected autenticacionRepositoryGetter: Getter<AutenticacionRepository>, @repository.getter('PedidoRepository') protected pedidoRepositoryGetter: Getter<PedidoRepository>,
  ) {
    super(Persona, dataSource);
    this.pedidos = this.createHasManyRepositoryFactoryFor('pedidos', pedidoRepositoryGetter,);
    this.registerInclusionResolver('pedidos', this.pedidos.inclusionResolver);
    this.autenticacion = this.createBelongsToAccessorFor('autenticacion', autenticacionRepositoryGetter,);
    this.registerInclusionResolver('autenticacion', this.autenticacion.inclusionResolver);
  }
}
