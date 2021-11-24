import { service } from '@loopback/core';
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
import { Llaves } from '../config/llaves';
import { Credencial, IdentificarUsuario } from '../models';
import {CredencialRepository} from '../repositories';
import { AutenticacionService } from '../services';
const fetch = require ("node-fetch");

export class CredencialController {
  constructor(
    @repository(CredencialRepository)
    public credencialRepository : CredencialRepository,
    @service(AutenticacionService)
    public servicioAutenticacion : AutenticacionService,
  ) {}

  @post("/identificarCredencial",{
    responses:{
      '200':{
        description:"identificacion de credencial"
      }
    }
  })
  async identificarCredencial(
    @requestBody() identificarUsuario:IdentificarUsuario
  ){
    let c = await this.servicioAutenticacion.IdentificarCredencial(identificarUsuario.usuario, identificarUsuario.clave);
    if(c){
      let token = this.servicioAutenticacion.GenerarTokenJWT(c);
      return {
        datos:{
          correo: c.email,
          id: c.id
        },
        tk: token
      }
    }else{
      throw new HttpErrors[401]("Los datos ingresados no son validos");
    }
  }

  @post('/credenciales')
  @response(200, {
    description: 'Credencial model instance',
    content: {'application/json': {schema: getModelSchemaRef(Credencial)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Credencial, {
            title: 'NewCredencial',
            exclude: ['id'],
          }),
        },
      },
    })
    credencial: Omit<Credencial, 'id'>,
  ): Promise<Credencial> {
    let clave = this.servicioAutenticacion.GenerarClave();
    let claveCifrada = this.servicioAutenticacion.CifrarClave(clave);
    credencial.clave = claveCifrada;

    let c = await this.credencialRepository.create(credencial);

    //Notificacion usuario
    let destino = credencial.email;
    let asunto = "Registro en nuestra Tienda";
    let contenido = `¡Hola, bienvenido a nuestra Tienda! Para poder acceder, estos son tus datos:
    Usuario: ${credencial.email}
    Contraseña: ${clave}`;
    fetch(`${Llaves.urlServicioNotificaciones}/envio-correo?correo_destino=${destino}&asunto=${asunto}&contenido=${contenido}`)
    .then((data:any)=>{
      console.log(data);
    });

    return c;
  }

  @get('/credenciales/count')
  @response(200, {
    description: 'Credencial model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Credencial) where?: Where<Credencial>,
  ): Promise<Count> {
    return this.credencialRepository.count(where);
  }

  @get('/credenciales')
  @response(200, {
    description: 'Array of Credencial model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Credencial, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Credencial) filter?: Filter<Credencial>,
  ): Promise<Credencial[]> {
    return this.credencialRepository.find(filter);
  }

  @patch('/credenciales')
  @response(200, {
    description: 'Credencial PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Credencial, {partial: true}),
        },
      },
    })
    credencial: Credencial,
    @param.where(Credencial) where?: Where<Credencial>,
  ): Promise<Count> {
    return this.credencialRepository.updateAll(credencial, where);
  }

  @get('/credenciales/{id}')
  @response(200, {
    description: 'Credencial model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Credencial, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Credencial, {exclude: 'where'}) filter?: FilterExcludingWhere<Credencial>
  ): Promise<Credencial> {
    return this.credencialRepository.findById(id, filter);
  }

  @patch('/credenciales/{id}')
  @response(204, {
    description: 'Credencial PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Credencial, {partial: true}),
        },
      },
    })
    credencial: Credencial,
  ): Promise<void> {
    await this.credencialRepository.updateById(id, credencial);
  }

  @put('/credenciales/{id}')
  @response(204, {
    description: 'Credencial PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() credencial: Credencial,
  ): Promise<void> {
    await this.credencialRepository.replaceById(id, credencial);
  }

  @del('/credenciales/{id}')
  @response(204, {
    description: 'Credencial DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.credencialRepository.deleteById(id);
  }
}
