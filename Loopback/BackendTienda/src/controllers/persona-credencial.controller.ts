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
  Credencial,
} from '../models';
import {PersonaRepository} from '../repositories';

export class PersonaCredencialController {
  constructor(
    @repository(PersonaRepository)
    public personaRepository: PersonaRepository,
  ) { }

  @get('/personas/{id}/credencial', {
    responses: {
      '200': {
        description: 'Credencial belonging to Persona',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Credencial)},
          },
        },
      },
    },
  })
  async getCredencial(
    @param.path.string('id') id: typeof Persona.prototype.id,
  ): Promise<Credencial> {
    return this.personaRepository.credencial(id);
  }
}
