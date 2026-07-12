import { buscarUsuario } from "./usuarioService";


export function buscarCarteira(){


  const usuario = buscarUsuario();



  if(!usuario){

    return {

      saldo:0,

      transacoes:[]

    };

  }



  if(!usuario.carteira){


    usuario.carteira = {

      saldo:0,

      transacoes:[]

    };


    localStorage.setItem(

      "usuario",

      JSON.stringify(usuario)

    );


  }



  return usuario.carteira;


}





export function salvarCarteira(carteira){


  const usuario = buscarUsuario();



  if(usuario){


    usuario.carteira = carteira;



    localStorage.setItem(

      "usuario",

      JSON.stringify(usuario)

    );


  }


}





export function adicionarSaldo(valor){


  const carteira = buscarCarteira();



  carteira.saldo += valor;



  carteira.transacoes.push({

    tipo:"entrada",

    valor,

    data:new Date().toISOString()

  });



  salvarCarteira(carteira);



  return carteira;


}
