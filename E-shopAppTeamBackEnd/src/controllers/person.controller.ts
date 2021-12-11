import {service} from '@loopback/core';
import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
  HttpErrors,
} from '@loopback/rest';
import {Keys} from '../config/keys';
import {Credentials, Person} from '../models';
import {PersonRepository} from '../repositories';
import {AuthenticationService} from '../services';
const fetch = require('node-fetch');

export class PersonController {
  constructor(
    @repository(PersonRepository)
    public personRepository: PersonRepository,
    @service(AuthenticationService)
    public serviceAuthentication: AuthenticationService,
  ) {}

  @post('/identificarPersona', {
    responses: {
      '200': {
        description: 'Identificación de Usuarios',
      },
    },
  })
  async identifyPerson(@requestBody() credentials: Credentials) {
    let p = await this.serviceAuthentication.IdentifyPerson(
      credentials.user,
      credentials.key,
    );
    if (p) {
      let token = this.serviceAuthentication.GenerateTokenJWT(p);
      return {
        datas: {
          name: p.name,
          email: p.email,
          id: p.id,
        },
        tk: token,
      };
    } else {
      throw new HttpErrors[401]('Datos inválidos');
    }
  }

  @post('/identificarEmail', {
    responses: {
      '200': {
        description: 'Identificación de Usuarios',
      },
    },
  })
  async identifyEmail(
    @requestBody() credentials: Credentials,
  ): Promise<Person> {
    let p = await this.serviceAuthentication.IdentifyEmail(credentials.user);
    if (p) {
      let key = this.serviceAuthentication.GenerateKey();
      let encryptedKey = this.serviceAuthentication.EncodeKey(key);
      p.key = encryptedKey;
      let user = await this.personRepository.update(p);

      //Notificar al usuario
      let destino = p.email;
      let asunto = 'Recuperación de la Contraseña en la Plataforma E-Shop';
      let contenido = `Hola ${p.name}, su nombre de usuario es: ${p.email} y su Nueva contraseña es: ${key}`;
      fetch(
        `${Keys.urlServiceNotifications}/envio-correo?correo_destino=${destino}&asunto=${asunto}&contenido=${contenido}`,
      ).then((data: any) => {
        console.log(data);
      });
    } else {
      throw new HttpErrors[401]('El correo No Se Encuentra Registrado');
    }
    return p;
  }

  @post('/people')
  @response(200, {
    description: 'Person model instance',
    content: {'application/json': {schema: getModelSchemaRef(Person)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Person, {
            title: 'NewPerson',
            exclude: ['id'],
          }),
        },
      },
    })
    person: Omit<Person, 'id'>,
  ): Promise<Person> {
    let key = this.serviceAuthentication.GenerateKey();
    let encryptedKey = this.serviceAuthentication.EncodeKey(key);
    person.key = encryptedKey;
    let p = await this.personRepository.create(person);

    //Notificar al usuario
    let destino = person.email;
    let asunto = 'Registro en la Plataforma';
    let contenido = `Hola ${person.name}, su nombre de usuario es: ${person.email} y su contraseña es: ${key}`;
    fetch(
      `${Keys.urlServiceNotifications}/envio-correo?correo_destino=${destino}&asunto=${asunto}&contenido=${contenido}`,
    ).then((data: any) => {
      console.log(data);
    });
    return p;
  }

  @get('/personaRegistrada')
  @response(200, {
    description: 'Identificar si el Usuario ya Existe',
  })
  async IsPerson(user: string) {
    return this.serviceAuthentication.IsPerson(user);
  }

  @get('/people/count')
  @response(200, {
    description: 'Person model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(@param.where(Person) where?: Where<Person>): Promise<Count> {
    // return this.personRepository.count(where);
    return this.personRepository.count(where);
  }

  @get('/people')
  @response(200, {
    description: 'Array of Person model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Person, {includeRelations: true}),
        },
      },
    },
  })
  async find(@param.filter(Person) filter?: Filter<Person>): Promise<Person[]> {
    return this.personRepository.find();
  }

  @patch('/people')
  @response(200, {
    description: 'Person PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Person, {partial: true}),
        },
      },
    })
    person: Person,
    @param.where(Person) where?: Where<Person>,
  ): Promise<Count> {
    return this.personRepository.updateAll(person, where);
  }

  @get('/people/{id}')
  @response(200, {
    description: 'Person model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Person, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Person, {exclude: 'where'})
    filter?: FilterExcludingWhere<Person>,
  ): Promise<Person> {
    return this.personRepository.findById(id, filter);
  }

  @patch('/people/{id}')
  @response(204, {
    description: 'Person PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Person, {partial: true}),
        },
      },
    })
    person: Person,
  ): Promise<void> {
    await this.personRepository.updateById(id, person);
  }

  @put('/people/{id}')
  @response(204, {
    description: 'Person PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() person: Person,
  ): Promise<void> {
    await this.personRepository.replaceById(id, person);
  }

  @del('/people/{id}')
  @response(204, {
    description: 'Person DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.personRepository.deleteById(id);
  }
}
