export function buscarNotificacoes(){

  const dados = localStorage.getItem("notificacoes");


  if(!dados){

    return [];

  }


  return JSON.parse(dados);

}







export function adicionarNotificacao(usuarioId, mensagem){


  const notificacoes = buscarNotificacoes();



  notificacoes.push({

    id: Date.now(),

    usuarioId,

    mensagem,

    lida:false,

    data:new Date().toISOString()

  });



  localStorage.setItem(

    "notificacoes",

    JSON.stringify(notificacoes)

  );


}







export function marcarComoLida(id){


  const notificacoes = buscarNotificacoes();



  const atualizadas = notificacoes.map(item=>{


    if(item.id === id){

      return {

        ...item,

        lida:true

      };

    }


    return item;


  });



  localStorage.setItem(

    "notificacoes",

    JSON.stringify(atualizadas)

  );


}







export function contarNaoLidas(usuarioId){


  const notificacoes = buscarNotificacoes();



  return notificacoes.filter(


    item =>


      item.usuarioId === usuarioId &&

      !item.lida



  ).length;


}
