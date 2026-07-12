export default class Transacao {

  constructor(tipo, valor, origem, destino){

    this.id = Date.now();

    this.tipo = tipo;

    this.valor = valor;

    this.origem = origem;

    this.destino = destino;

    this.data = new Date().toISOString();

  }

}
