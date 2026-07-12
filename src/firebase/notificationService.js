import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  orderBy
} from "firebase/firestore";

import { db } from "./config";

const notificacoesRef = collection(db, "notificacoes");

export async function adicionarNotificacao(usuarioId, mensagem){

  await addDoc(notificacoesRef, {
    usuarioId,
    mensagem,
    lida: false,
    data: new Date().toISOString()
  });

}

export async function buscarNotificacoes(usuarioId){

  const consulta = query(
    notificacoesRef,
    where("usuarioId", "==", usuarioId),
    orderBy("data", "desc")
  );

  const resultado = await getDocs(consulta);

  return resultado.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }));

}
