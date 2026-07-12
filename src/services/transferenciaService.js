import { buscarUsuario, buscarUsuarios } from "./usuarioService";
import { adicionarNotificacao } from "./notificacaoService";


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





  // retirar do remetente

  remetente.carteira.saldo -= valor;


  remetente.carteira.transacoes.push({

    tipo:"transferência enviada",

    destino:destinatario.nome,

    valor,

    data:new Date().toISOString()

  });







  // adicionar ao destinatário

  destinatario.carteira.saldo += valor;


  destinatario.carteira.transacoes.push({

    tipo:"transferência recebida",

    origem:remetente.nome,

    valor,

    data:new Date().toISOString()

  });







  // notificação para quem recebeu

  adicionarNotificacao(

    destinatario.id,

    `Você recebeu ${valor} J Coins de ${remetente.nome}`

  );





  // notificação para quem enviou

  adicionarNotificacao(

    remetente.id,

    `Você enviou ${valor} J Coins para ${destinatario.nome}`

  );







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







  localStorage.setItem(

    "usuario",

    JSON.stringify(remetente)

  );







  return {

    sucesso:true,

    mensagem:"Transferência realizada com sucesso!"

  };


}
