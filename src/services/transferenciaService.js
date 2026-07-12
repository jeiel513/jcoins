import { buscarCarteira } from "./carteiraService";


export function transferirJCoins(destino, valor){

  const carteira = buscarCarteira();


  if(valor <= 0){

    return {
      sucesso:false,
      mensagem:"Valor inválido"
    };

  }


  if(carteira.saldo < valor){

    return {
      sucesso:false,
      mensagem:"Saldo insuficiente"
    };

  }


  carteira.saldo -= valor;


  carteira.transacoes.push({

    tipo:"transferência enviada",

    destino,

    valor,

    data:new Date().toISOString()

  });



  localStorage.setItem(
    "carteira",
    JSON.stringify(carteira)
  );


  return {

    sucesso:true,

    mensagem:"Transferência realizada"

  };

}
