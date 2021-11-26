import{AuthenticationStrategy} from '@loopback/authentication';
import parseBearerToken from 'parse-bearer-token';
import {UserProfile } from '@loopback/security';
import {HttpErrors, Request} from '@loopback/rest';
import {service} from '@loopback/core';
import {AutenticacionService} from '../services';





export class EstrategiaAdministrador implements AuthenticationStrategy{
  name: string= 'admin';

  constructor(
    @service(AutenticacionService)
    public servicioAutenticacion:AutenticacionService
  ){}

  async authenticate(request:Request):Promise<UserProfile |undefined>{
    let token = parseBearerToken(request);
    if(token){
      let datos = this.servicioAutenticacion.ValidarTokenJWT(token);
        if(datos){
          //aquí se puede evaluar el rol 
          let perfil: UserProfile = Object.assign({
            nombre:datos.data.id
          });
          return perfil;
        }else{
          throw new HttpErrors[401]("El token no es valido")
        }
    }else{
      throw new HttpErrors[401]("no hay un token para ejecutar su solicitud")
    }
  }
}
