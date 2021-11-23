import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Persona,
  Autenticacion,
} from '../models';
import {PersonaRepository} from '../repositories';

export class PersonaAutenticacionController {
  constructor(
    @repository(PersonaRepository)
    public personaRepository: PersonaRepository,
  ) { }

  @get('/personas/{id}/autenticacion', {
    responses: {
      '200': {
        description: 'Autenticacion belonging to Persona',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Autenticacion)},
          },
        },
      },
    },
  })
  async getAutenticacion(
    @param.path.string('id') id: typeof Persona.prototype.id,
  ): Promise<Autenticacion> {
    return this.personaRepository.autenticacion(id);
  }
}
