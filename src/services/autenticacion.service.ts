import { /* inject, */ BindingScope, injectable} from '@loopback/core';
import {repository} from '@loopback/repository';
import {llaves} from '../config/llaves';
import {Persona} from '../models';
import {PersonaRepository} from '../repositories';
const generador = require("password-generator");
const cryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

@injectable({scope: BindingScope.TRANSIENT})
export class AutenticacionService {
  constructor(/* Add @inject to inject parameters */
    @repository(PersonaRepository)
    public personaRepository: PersonaRepository
  ) { }

  /*
   * Add service methods here
   */

  // eslint-disable-next-line @typescript-eslint/naming-convention
  GenerarClave() {
    const clave = generador(8, false);
    return clave;
  }

  // eslint-disable-next-line @typescript-eslint/naming-convention
  CifrarClave(clave: string) {
    const claveCifrada = cryptoJS.MD5(clave).toString();
    return claveCifrada;
  }

  // eslint-disable-next-line @typescript-eslint/naming-convention
  IdentificarPersona(usuario: string, clave: string) {
    try {
      const p = this.personaRepository.findOne({where: {correo: usuario, clave: clave}});
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      if (p) {
        return p;
      }
      return false;
    } catch {
      return false;
    }
  }

  // eslint-disable-next-line @typescript-eslint/naming-convention
  GenerarTokenJWT(persona: Persona) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const token = jwt.sign({
      data: {
        id: persona.id,
        correo: persona.correo,
        nombre: persona.nombres + " " + persona.apellidos
      }
    },
      llaves.claveJWT);
    return token;
  }

  // eslint-disable-next-line @typescript-eslint/naming-convention
  ValidarTokenJWT(token: string) {
    try {
      const datos = jwt.verify(token, llaves.claveJWT);
      return datos;
    } catch {
      return false;
    }
  }

}
