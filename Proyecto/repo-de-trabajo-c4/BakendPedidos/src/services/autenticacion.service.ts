import { /* inject, */ BindingScope, injectable} from '@loopback/core';
import {repository} from '@loopback/repository';
import {llaves} from '../config/llaves';
import {Persona} from '../models';
import {PersonaRepository} from '../repositories';
const generador = require ("password-generator");
const cryptoJS = require ("crypto-js");
const jwt = require("jsonwebtoken");

@injectable({scope: BindingScope.TRANSIENT})
export class AutenticacionService {
  constructor(
    @repository(PersonaRepository)
    public personaRepository:PersonaRepository) {}

  /*
   * Add service methods here
   */
  GenerarClave(){
    let clave = generador(16,false);
    return clave;
  }
  cifrarClave(clave:string){
    let clavecifrada =cryptoJS.MD5(clave).toString();
    return clavecifrada;
  }
  Identificarpersona(usuario:string, clave:string){
    try{
        let p = this.personaRepository.findOne({where:{
          correo:usuario,clave:clave}})
          if(p){
            return p;

          }else{
            return false;
          }
    }catch{
      return false;
    }

  }
  GenerarTokenJWT(persona:Persona){
    let token = jwt.sign({
      data:{
        id:persona.id,
        correo: persona.correo,
        nombre: persona.nombres +" "+ persona.apellidos
      }

    },
    llaves.claveJWT);

    return token;
  }

  ValidarTokenJWT(token:string){
    try{
      let datos = jwt.verify(token,llaves.claveJWT)
      return datos;
    }catch{
      return false;
    }
  }
}
