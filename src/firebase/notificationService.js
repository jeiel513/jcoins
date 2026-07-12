import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  orderBy,
  updateDoc,
  doc
} from "firebase/firestore";

import { db } from "./config";


const notificacoesRef = collection(
  db,
  "notificacoes"
);



export async function adicionarNotificacao(
  usuarioId,
  mensagem
){

  await addDoc(
    notificacoesRef,
    {
      usuarioId,

      mensagem,

      lida:false,

      data:new Date().toISOString()

    }
  );

}




export async function buscarNotificacoes(
  usuarioId
){

  const consulta = query(

    notificacoesRef,

    where(
      "usuarioId",
      "==",
      usuarioId
    ),

    orderBy(
      "data",
      "desc"
    )

  );



  const resultado = await getDocs(
    consulta
  );



  return resultado.docs.map(item=>({

    id:item.id,

    ...item.data()

  }));

}




export async function marcarComoLida(
  id
){

  await updateDoc(

    doc(
      db,
      "notificacoes",
      id
    ),

    {

      lida:true

    }

  );

}
