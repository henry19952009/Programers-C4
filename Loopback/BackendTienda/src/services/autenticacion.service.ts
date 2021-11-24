import {injectable, /* inject, */ BindingScope} from '@loopback/core';
import { repository } from '@loopback/repository';
import { Llaves } from '../config/llaves';
import { Credencial } from '../models';
import { CredencialRepository } from '../repositories';
const generador = require ("password-generator");
const cryptoJS = require ("crypto-js");
const JWT = require ("jsonwebtoken");

@injectable({scope: BindingScope.TRANSIENT})
export class AutenticacionService {
  constructor(
    @repository(CredencialRepository)
    public credencialRepository : CredencialRepository
  ) {}

  /*
   * Add service methods here
   */
  GenerarClave(){
    let clave = generador(8, false);
    return clave;
  }

  CifrarClave(clave:string){
    let claveCifrada = cryptoJS.MD5(clave).toString();
    return claveCifrada;
  }

  IdentificarCredencial(usuario:string, clave:string){
    try{
      let c = this.credencialRepository.findOne({where:{
        email:usuario, clave:clave}})
        if(c){
          return c;
        }
    }catch{
      return false;
    }
  }

  GenerarTokenJWT(credencial:Credencial){
    let token = JWT.sign({
      data:{
        id:credencial.id,
        correo: credencial.email
      }      
    },
    Llaves.claveJWT)    
    return token;
  }

  ValidarToken(token:string){
    try{
      let datos = JWT.verify(token, Llaves.claveJWT);
      return datos;
    }catch{
      return false;
    }      
  }
}
