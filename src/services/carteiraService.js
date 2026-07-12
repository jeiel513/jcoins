export function buscarCarteira(){

  const carteira =
    localStorage.getItem("carteira");


  if(carteira){

    return JSON.parse(carteira);

  }


  const novaCarteira = {

    saldo: 0,

    transacoes: []

  };


  localStorage.setItem(
    "carteira",
    JSON.stringify(novaCarteira)
  );


  return novaCarteira;

}



export function adicionarSaldo(valor){

  const carteira = buscarCarteira();


  carteira.saldo += valor;


  carteira.transacoes.push({

    tipo:"entrada",

    valor,

    data:new Date().toISOString()

  });


  localStorage.setItem(
    "carteira",
    JSON.stringify(carteira)
  );


  return carteira;

}
