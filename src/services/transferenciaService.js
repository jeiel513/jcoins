import { buscarUsuario, buscarUsuarios } from "./usuarioService";


export function transferirJCoins(destinoId, valor){

  const remetente = buscarUsuario();

  const usuarios = buscarUsuarios();



  if(!remetente){

    return {
      sucesso:false,
      mensagem:"Usuário não encontrado"
    };

  }



  const destinatario = usuarios.find(

    usuario => usuario.id === Number(destinoId)

  );



  if(!destinatario){

    return {
      sucesso:false,
      mensagem:"Destinatário não encontrado"
    };

  }



  if(valor <= 0){

    return {
      sucesso:false,
      mensagem:"Valor inválido"
    };

  }



  if(!remetente.carteira){

    remetente.carteira = {
      saldo:0,
      transacoes:[]
    };

  }



  if(remetente.carteira.saldo < valor){

    return {
      sucesso:false,
      mensagem:"Saldo insuficiente"
    };

  }





  if(!destinatario.carteira){

    destinatario.carteira = {
      saldo:0,
      transacoes:[]
    };

  }





  // retirar de quem envia

  remetente.carteira.saldo -= valor;


  remetente.carteira.transacoes.push({

    tipo:"transferência enviada",

    destino:destinatario.nome,

    valor,

    data:new Date().toISOString()

  });





  // adicionar para quem recebe

  destinatario.carteira.saldo += valor;


  destinatario.carteira.transacoes.push({

    tipo:"transferência recebida",

    origem:remetente.nome,

    valor,

    data:new Date().toISOString()

  });






  // atualizar lista geral

  const novaLista = usuarios.map(usuario=>{


    if(usuario.id === remetente.id){

      return remetente;

    }


    if(usuario.id === destinatario.id){

      return destinatario;

    }


    return usuario;


  });





  localStorage.setItem(

    "usuarios",

    JSON.stringify(novaLista)

  );





  // mantém remetente atualizado

  localStorage.setItem(

    "usuario",

    JSON.stringify(remetente)

  );





  return {

    sucesso:true,

    mensagem:"Transferência realizada com sucesso!"

  };


}
