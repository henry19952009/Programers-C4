import {injectable, /* inject, */ BindingScope} from '@loopback/core';
import {repository} from '@loopback/repository';
import {Person} from '../models';
import {PersonRepository} from '../repositories';
import {Keys} from '../config/keys';
const generator = require('password-generator');
const cryptoJS = require('crypto-js');
const jwt = require('jsonwebtoken');

@injectable({scope: BindingScope.TRANSIENT})
export class AuthenticationService {
  constructor(
    @repository(PersonRepository)
    public personRepository: PersonRepository,
  ) {}

  /*
   * Add service methods here
   */

  GenerateKey() {
    let key = generator(8, false);
    return key;
  }

  EncodeKey(key: string) {
    let encryptedKey = cryptoJS.MD5(key).toString();
    return encryptedKey;
  }

  IdentifyPerson(user: string, key: string) {
    try {
      let p = this.personRepository.findOne({
        where: {email: user, key: key},
      });

      if (p) {
        return p;
      }
      return false;
    } catch {
      return false;
    }
  } //
  IdentifyEmail(user: string) {
    try {
      let p = this.personRepository.findOne({
        where: {email: user},
      });
      if (p) {
        return p;
      } else {
        return false;
      }
    } catch {
      return false;
    }
  }

  UpdateEmail(user: string) {
    try {
      let p = this.personRepository.findOne({
        where: {email: user},
      });
      if (p) {
        return p;
      } else {
        return false;
      }
    } catch {
      return false;
    }
  }
  //este metodo lo utilizamos para conprobar si el correo / usuario ya esta registrado
  IsPerson(user: string) {
    try {
      let p = this.personRepository.findOne({
        where: {email: user},
      });
      if (p) {
        return p;
      }
      return false;
    } catch {
      return false;
    }
  }

  GenerateTokenJWT(person: Person) {
    let token = jwt.sign(
      {
        data: {
          id: person.id,
          correo: person.email,
          nombre: person.name + ' ' + person.lastName,
        },
      },
      Keys.keyJWT,
    );
    return token;
  }

  ValidateTokenJWT(token: string) {
    try {
      let datas = jwt.verify(token, Keys.keyJWT);
      return datas;
    } catch {
      return false;
    }
  }
}
