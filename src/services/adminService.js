import { buscarUsuarios, atualizarUsuario } from "./usuarioService";
import { adicionarNotificacao } from "./notificacaoService";



export function adicionarJCoins(usuarioId, valor){


  const usuarios = buscarUsuarios();



  const usuario = usuarios.find(

    item => item.id === Number(usuarioId)

  );



  if(!usuario){

    return {

      sucesso:false,

      mensagem:"Usuário não encontrado"

    };

  }





  if(!usuario.carteira){

    usuario.carteira = {

      saldo:0,

      transacoes:[]

    };

  }





  usuario.carteira.saldo += valor;



  usuario.carteira.transacoes.push({

    tipo:"crédito administrativo",

    valor,

    data:new Date().toISOString()

  });






  atualizarUsuario(usuario);





  adicionarNotificacao(

    usuario.id,

    `Você recebeu ${valor} J Coins do administrador`

  );





  return {

    sucesso:true,

    mensagem:"J Coins adicionados"

  };


}
