import {AuthenticationStrategy} from '@loopback/authentication';
import {service} from '@loopback/core';
import {HttpErrors, Request} from '@loopback/rest';
import {UserProfile} from '@loopback/security';
import parseBearerToken from 'parse-bearer-token';
import {AuthenticationService} from '../services';

export class StrategyAdmin implements AuthenticationStrategy {
  name: string = 'admin';

  constructor(
    @service(AuthenticationService)
    public serviceAuthentication: AuthenticationService,
  ) {}

  async authenticate(request: Request): Promise<UserProfile | undefined> {
    let token = parseBearerToken(request);

    if (token) {
      let datos = this.serviceAuthentication.ValidateTokenJWT(token);
      if (datos) {
        let perfil: UserProfile = Object.assign({
          nombre: datos.data.nombre,
        });
        return perfil;
      } else {
        throw new HttpErrors[401]('El token incluido no es Valido');
      }
    } else {
      throw new HttpErrors[401]('No hay un token para ejecutar su solicitud');
    }
  }
}
