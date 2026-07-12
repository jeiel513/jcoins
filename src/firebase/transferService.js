import {
  collection,
  query,
  where,
  getDocs,
  updateDoc,
  doc
} from "firebase/firestore";

import { db } from "./config";


async function buscarUsuarioPorUid(uid){

  const consulta = query(
    collection(db,"usuarios"),
    where("uid","==",uid)
  );


  const resultado = await getDocs(
    consulta
  );


  if(resultado.empty){

    return null;

  }


  const documento = resultado.docs[0];


  return {

    id: documento.id,

    ...documento.data()

  };

}



export async function transferirJCoins(
  remetenteUid,
  destinatarioUid,
  valor
){


  const remetente = await buscarUsuarioPorUid(
    remetenteUid
  );


  const destinatario = await buscarUsuarioPorUid(
    destinatarioUid
  );



  if(!remetente){

    return {
      sucesso:false,
      mensagem:"Remetente não encontrado"
    };

  }



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



  const carteiraRemetente =
    remetente.carteira || {
      saldo:0,
      transacoes:[]
    };



  const carteiraDestinatario =
    destinatario.carteira || {
      saldo:0,
      transacoes:[]
    };



  if(carteiraRemetente.saldo < valor){

    return {
      sucesso:false,
      mensagem:"Saldo insuficiente"
    };

  }



  carteiraRemetente.saldo -= valor;


  carteiraRemetente.transacoes.push({

    tipo:"transferência enviada",

    destino:destinatario.nome,

    valor,

    data:new Date().toISOString()

  });



  carteiraDestinatario.saldo += valor;


  carteiraDestinatario.transacoes.push({

    tipo:"transferência recebida",

    origem:remetente.nome,

    valor,

    data:new Date().toISOString()

  });



  await updateDoc(

    doc(db,"usuarios",remetente.id),

    {
      carteira:carteiraRemetente
    }

  );



  await updateDoc(

    doc(db,"usuarios",destinatario.id),

    {
      carteira:carteiraDestinatario
    }

  );



  return {

    sucesso:true,

    mensagem:"Transferência realizada com sucesso!"

  };


}
