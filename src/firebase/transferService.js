import {
  doc,
  getDoc,
  updateDoc
} from "firebase/firestore";

import { db } from "./config";


export async function transferirJCoins(
  remetenteId,
  destinatarioId,
  valor
){

  const remetenteRef = doc(
    db,
    "usuarios",
    remetenteId
  );

  const destinatarioRef = doc(
    db,
    "usuarios",
    destinatarioId
  );


  const remetenteDoc = await getDoc(
    remetenteRef
  );


  const destinatarioDoc = await getDoc(
    destinatarioRef
  );


  if(!remetenteDoc.exists()){

    return {
      sucesso:false,
      mensagem:"Remetente não encontrado"
    };

  }


  if(!destinatarioDoc.exists()){

    return {
      sucesso:false,
      mensagem:"Destinatário não encontrado"
    };

  }


  const remetente = {
    id:remetenteDoc.id,
    ...remetenteDoc.data()
  };


  const destinatario = {
    id:destinatarioDoc.id,
    ...destinatarioDoc.data()
  };



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

    remetenteRef,

    {
      carteira:carteiraRemetente
    }

  );



  await updateDoc(

    destinatarioRef,

    {
      carteira:carteiraDestinatario
    }

  );



  return {

    sucesso:true,

    mensagem:"Transferência realizada com sucesso!"

  };


}
