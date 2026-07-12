export default class Carteira {

  constructor(usuarioId){

    this.usuarioId = usuarioId;

    this.saldo = 0;

    this.criadaEm = new Date().toISOString();

  }

}
