import { /* inject, */ BindingScope, injectable} from '@loopback/core';
const generador = require("password-generator");
const cryptoJS = require("crypto-js");

@injectable({scope: BindingScope.TRANSIENT})
export class AutenticacionService {
  constructor(/* Add @inject to inject parameters */) { }

  /*
   * Add service methods here
   */

  // eslint-disable-next-line @typescript-eslint/naming-convention
  GenerarClave() {
    const clave = generador(8, false);
    return clave;
  }

  // eslint-disable-next-line @typescript-eslint/naming-convention
  CifrarClave(clave: String) {
    const claveCifrada = cryptoJS.MD5(clave).toString();
    return claveCifrada;
  }

}
